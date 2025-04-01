import {
  REGISTRY,
  SigningHyperlaneModuleClient,
} from '@hyperlane-xyz/cosmos-sdk';
import {
  Domain,
  ProtocolType,
  eqAddress,
  rootLogger,
} from '@hyperlane-xyz/utils';

import { CosmosDeployer } from '../deploy/CosmosDeployer.js';
import { HookType } from '../hook/types.js';
import { CosmosIsmModule } from '../ism/CosmosIsmModule.js';
import { IsmType } from '../ism/types.js';
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

    const defaultIsm = ismModule.serialize().deployedIsm;

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
      ...this.createMailboxOwnerUpdateTxs(actualConfig, expectedConfig),
    );

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
}
