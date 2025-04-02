import {
  REGISTRY,
  SigningHyperlaneModuleClient,
} from '@hyperlane-xyz/cosmos-sdk';
import {
  Address,
  Domain,
  ProtocolType,
  eqAddress,
  rootLogger,
} from '@hyperlane-xyz/utils';

import { CosmosDeployer } from '../deploy/CosmosDeployer.js';
import { HookType } from '../hook/types.js';
import { CosmosIsmModule } from '../ism/CosmosIsmModule.js';
import { DerivedIsmConfig } from '../ism/EvmIsmReader.js';
import { IsmConfig, IsmType } from '../ism/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedCosmJsTransaction } from '../providers/ProviderType.js';
import { ChainName, ChainNameOrId } from '../types.js';

import {
  HyperlaneModule,
  HyperlaneModuleParams,
} from './AbstractHyperlaneModule.js';
import { CosmosCoreReader } from './CosmosCoreReader.js';
import { CoreConfig, CoreConfigSchema, DerivedCoreConfig } from './types.js';

export class CosmosCoreModule extends HyperlaneModule<
  ProtocolType.Cosmos,
  CoreConfig,
  Record<string, string>
> {
  protected logger = rootLogger.child({ module: 'CosmosCoreModule' });
  protected coreReader: CosmosCoreReader;

  public readonly chainName: ChainName;
  public readonly chainId: string;
  public readonly domainId: Domain;

  constructor(
    protected readonly multiProvider: MultiProvider,
    protected readonly signer: SigningHyperlaneModuleClient,
    args: HyperlaneModuleParams<CoreConfig, Record<string, string>>,
  ) {
    super(args);

    this.chainName = multiProvider.getChainName(args.chain);
    this.chainId = multiProvider.getChainId(args.chain).toString();
    this.domainId = multiProvider.getDomainId(args.chain);

    this.coreReader = new CosmosCoreReader(this.multiProvider, signer);
  }

  /**
   * Reads the core configuration from the mailbox address
   * @returns The core config.
   */
  public async read(): Promise<DerivedCoreConfig> {
    return this.coreReader.deriveCoreConfig(this.args.addresses.mailbox);
  }

  /**
   * Deploys the Core contracts.
   * @returns The created CosmosCoreModule instance.
   */
  public static async create(params: {
    chain: ChainNameOrId;
    config: CoreConfig;
    multiProvider: MultiProvider;
    signer: SigningHyperlaneModuleClient;
  }): Promise<CosmosCoreModule> {
    const { chain, config, multiProvider, signer } = params;
    const addresses = await CosmosCoreModule.deploy({
      config,
      multiProvider,
      chain,
      signer,
    });

    // Create CoreModule and deploy the Core contracts
    const module = new CosmosCoreModule(multiProvider, signer, {
      addresses,
      chain,
      config,
    });

    return module;
  }

  /**
   * Deploys the core Hyperlane contracts.
   * @returns The deployed core contract addresses.
   */
  static async deploy(params: {
    config: CoreConfig;
    multiProvider: MultiProvider;
    chain: ChainNameOrId;
    signer: SigningHyperlaneModuleClient;
  }): Promise<Record<string, string>> {
    const { config, multiProvider, chain, signer } = params;

    const chainName = multiProvider.getChainName(chain);
    const domainId = multiProvider.getDomainId(chain);

    const deployer = new CosmosDeployer(multiProvider, signer);

    // 1. Deploy default ISM
    const ismModule = await CosmosIsmModule.create({
      chain: chainName,
      config: config.defaultIsm,
      addresses: {
        deployedIsm: '',
        mailbox: '',
      },
      multiProvider,
      signer,
    });

    const { deployedIsm: defaultIsm } = ismModule.serialize();

    // 2. Deploy Mailbox with initial configuration
    const { response: mailbox } = await signer.createMailbox({
      local_domain: domainId,
      default_ism: defaultIsm,
      default_hook: '',
      required_hook: '',
    });

    // 3. Deploy default hook
    const defaultHook = await deployer.deployHook({
      chain: chainName,
      hookConfig: config.defaultHook,
      mailbox: mailbox.id,
    });

    // 4. Deploy required hook
    const requiredHook = await deployer.deployHook({
      chain: chainName,
      hookConfig: config.requiredHook,
      mailbox: mailbox.id,
    });

    // 5. Update the configuration with the newly created hooks
    await signer.setMailbox({
      mailbox_id: mailbox.id,
      default_ism: defaultIsm,
      default_hook: defaultHook,
      required_hook: requiredHook,
      new_owner: config.owner || '',
    });

    const addresses: Record<string, string> = {
      mailbox: mailbox.id,
    };

    if (typeof config.defaultIsm !== 'string') {
      if (config.defaultIsm.type === IsmType.MERKLE_ROOT_MULTISIG) {
        addresses.staticMerkleRootMultisigIsmFactory = defaultIsm;
      } else if (config.defaultIsm.type === IsmType.MESSAGE_ID_MULTISIG) {
        addresses.staticMessageIdMultisigIsmFactory = defaultIsm;
      }
    }

    if (typeof config.defaultHook !== 'string') {
      if (config.defaultHook.type === HookType.INTERCHAIN_GAS_PAYMASTER) {
        addresses.interchainGasPaymaster = defaultHook;
      } else if (config.defaultHook.type === HookType.MERKLE_TREE) {
        addresses.merkleTreeHook = defaultHook;
      }
    }

    if (typeof config.requiredHook !== 'string') {
      if (config.requiredHook.type === HookType.INTERCHAIN_GAS_PAYMASTER) {
        addresses.interchainGasPaymaster = requiredHook;
      } else if (config.requiredHook.type === HookType.MERKLE_TREE) {
        addresses.merkleTreeHook = requiredHook;
      }
    }

    return addresses;
  }

  /**
   * Updates the core contracts with the provided configuration.
   *
   * @param expectedConfig - The configuration for the core contracts to be updated.
   * @returns An array of Cosmos transactions that were executed to update the contract.
   */
  public async update(
    expectedConfig: CoreConfig,
  ): Promise<AnnotatedCosmJsTransaction[]> {
    CoreConfigSchema.parse(expectedConfig);
    const actualConfig = await this.read();

    let transactions: AnnotatedCosmJsTransaction[] = [];
    transactions.push(
      ...(await this.createDefaultIsmUpdateTxs(actualConfig, expectedConfig)),
      ...this.createMailboxOwnerUpdateTxs(actualConfig, expectedConfig),
    );

    // TODO: what about hook updates?

    return transactions;
  }

  private createMailboxOwnerUpdateTxs(
    actualConfig: CoreConfig,
    expectedConfig: CoreConfig,
  ): AnnotatedCosmJsTransaction[] {
    if (eqAddress(actualConfig.owner, expectedConfig.owner)) {
      return [];
    }

    return [
      {
        annotation: `Transferring ownership of Mailbox from ${actualConfig.owner} to ${expectedConfig.owner}`,
        typeUrl: REGISTRY.MsgSetMailbox.proto.type,
        value: REGISTRY.MsgSetMailbox.proto.converter.create({
          owner: actualConfig.owner,
          mailbox_id: this.args.addresses.mailbox,
          new_owner: expectedConfig.owner,
        }),
      },
    ];
  }

  /**
   * Create a transaction to update an existing ISM config, or deploy a new ISM and return a tx to setDefaultIsm
   *
   * @param actualConfig - The on-chain router configuration, including the ISM configuration, and address.
   * @param expectedConfig - The expected token router configuration, including the ISM configuration.
   * @returns Transaction that need to be executed to update the ISM configuration.
   */
  async createDefaultIsmUpdateTxs(
    actualConfig: DerivedCoreConfig,
    expectedConfig: CoreConfig,
  ): Promise<AnnotatedCosmJsTransaction[]> {
    const updateTransactions: AnnotatedCosmJsTransaction[] = [];

    const actualDefaultIsmConfig = actualConfig.defaultIsm as DerivedIsmConfig;

    // Try to update (may also deploy) Ism with the expected config
    const { deployedIsm, ismUpdateTxs } = await this.deployOrUpdateIsm(
      actualDefaultIsmConfig,
      expectedConfig.defaultIsm,
    );

    if (ismUpdateTxs.length) {
      updateTransactions.push(...ismUpdateTxs);
    }

    const newIsmDeployed = !eqAddress(
      actualDefaultIsmConfig.address,
      deployedIsm,
    );
    if (newIsmDeployed) {
      const { mailbox } = this.serialize();
      updateTransactions.push({
        annotation: `Updating default ISM of Mailbox from ${mailbox} to ${deployedIsm}`,
        typeUrl: REGISTRY.MsgSetMailbox.proto.type,
        value: REGISTRY.MsgSetMailbox.proto.converter.create({
          owner: actualConfig.owner,
          mailbox_id: mailbox,
          default_ism: deployedIsm,
        }),
      });
    }

    return updateTransactions;
  }

  /**
   * Updates or deploys the ISM using the provided configuration.
   *
   * @returns Object with deployedIsm address, and update Transactions
   */
  public async deployOrUpdateIsm(
    actualDefaultIsmConfig: DerivedIsmConfig,
    expectDefaultIsmConfig: IsmConfig,
  ): Promise<{
    deployedIsm: Address;
    ismUpdateTxs: AnnotatedCosmJsTransaction[];
  }> {
    const { mailbox } = this.serialize();

    const ismModule = new CosmosIsmModule(
      this.multiProvider,
      {
        addresses: {
          mailbox: mailbox,
          deployedIsm: actualDefaultIsmConfig.address,
        },
        chain: this.chainName,
        config: actualDefaultIsmConfig.address,
      },
      this.signer,
    );
    this.logger.info(
      `Comparing target ISM config with ${this.args.chain} chain`,
    );
    const ismUpdateTxs = await ismModule.update(expectDefaultIsmConfig);
    const { deployedIsm } = ismModule.serialize();

    return { deployedIsm, ismUpdateTxs };
  }
}
