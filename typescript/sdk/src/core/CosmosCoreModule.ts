import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address, rootLogger } from '@hyperlane-xyz/utils';

import { CosmosDeployer } from '../deploy/CosmosDeployer.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainNameOrId } from '../types.js';

import { CosmosCoreReader } from './CosmosCoreReader.js';
import { CoreConfig } from './types.js';

export class CosmosCoreModule {
  protected logger = rootLogger.child({ module: 'CosmosCoreModule' });
  protected deployer: CosmosDeployer;
  protected coreReader: CosmosCoreReader;

  constructor(
    protected readonly multiProvider: MultiProvider,
    protected readonly signer: SigningHyperlaneModuleClient,
  ) {
    this.deployer = new CosmosDeployer(this.multiProvider, signer);
    this.coreReader = new CosmosCoreReader(this.multiProvider, signer);
  }

  /**
   * Reads the core configuration from the mailbox address
   * @returns The core config.
   */
  public async read(mailboxAddress: Address): Promise<CoreConfig> {
    return this.coreReader.deriveCoreConfig(mailboxAddress);
  }

  async deploy(params: {
    config: CoreConfig;
    chain: ChainNameOrId;
  }): Promise<Record<string, string>> {
    const { config, chain } = params;
    const chainName = this.multiProvider.getChainName(chain);
    const domainId = this.multiProvider.getDomainId(chain);

    // 1. Deploy default ISM
    const defaultIsm = await this.deployer.deployIsm({
      chain: chainName,
      ismConfig: config.defaultIsm,
    });

    // 2. Deploy Mailbox with initial configuration
    const { response: mailbox } = await this.signer.createMailbox({
      local_domain: domainId,
      default_ism: defaultIsm,
      default_hook: '',
      required_hook: '',
    });

    // 3. Deploy default hook
    const defaultHook = await this.deployer.deployHook({
      chain: chainName,
      hookConfig: config.defaultHook,
      mailbox: mailbox.id,
    });

    // 4. Deploy required hook
    const requiredHook = await this.deployer.deployHook({
      chain: chainName,
      hookConfig: config.requiredHook,
      mailbox: mailbox.id,
    });

    // 5. Update the configuration with the newly created hooks
    await this.signer.setMailbox({
      mailbox_id: mailbox.id,
      default_ism: defaultIsm,
      default_hook: defaultHook,
      required_hook: requiredHook,
      new_owner: config.owner,
    });

    // TODO: return ISM and hook addresses
    return {
      mailbox: mailbox.id,
    };
  }
}
