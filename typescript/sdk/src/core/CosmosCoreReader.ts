import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address, rootLogger } from '@hyperlane-xyz/utils';

import { CosmosHookReader } from '../hook/CosmosHookReader.js';
import { CosmosIsmReader } from '../ism/CosmosIsmReader.js';
import { MultiProvider } from '../providers/MultiProvider.js';

import { CoreConfig } from './types.js';

export class CosmosCoreReader {
  protected readonly logger = rootLogger.child({
    module: 'CosmosCoreReader',
  });
  protected ismReader: CosmosIsmReader;
  protected hookReader: CosmosHookReader;

  constructor(
    protected readonly multiProvider: MultiProvider,
    protected readonly signer: SigningHyperlaneModuleClient,
  ) {
    this.ismReader = new CosmosIsmReader(this.signer);
    this.hookReader = new CosmosHookReader(this.multiProvider, this.signer);
  }

  async deriveCoreConfig(mailboxAddress: Address): Promise<CoreConfig> {
    const { mailbox } = await this.signer.query.core.Mailbox({
      id: mailboxAddress,
    });

    if (!mailbox) {
      throw new Error(`Mailbox not found for address ${mailboxAddress}`);
    }

    return {
      owner: mailbox.owner,
      defaultIsm: await this.ismReader.deriveIsmConfig(mailbox.default_ism),
      defaultHook: await this.hookReader.deriveHookConfig(mailbox.default_hook),
      requiredHook: await this.hookReader.deriveHookConfig(
        mailbox.required_hook,
      ),
    };
  }
}
