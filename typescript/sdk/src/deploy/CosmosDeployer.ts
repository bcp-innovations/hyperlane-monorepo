import { Logger } from 'pino';

import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address, rootLogger } from '@hyperlane-xyz/utils';

import { IsmConfig, IsmType } from '../ism/types.js';
import { ChainName } from '../types.js';

export class CosmosDeployer {
  private readonly logger: Logger;

  constructor(private readonly signer: SigningHyperlaneModuleClient) {
    this.logger = rootLogger.child({ module: 'cosmos-deployer' });
  }

  async deployIsm(params: {
    chain: ChainName;
    ismConfig: IsmConfig;
    mailbox: Address;
  }): Promise<Address> {
    const { chain, ismConfig } = params;
    if (typeof ismConfig === 'string') {
      return ismConfig;
    }
    const ismType = ismConfig.type;
    this.logger.info(`Deploying ${ismType} to ${chain}`);

    // Log ownership model difference for ownable ISMs
    if (
      [IsmType.MERKLE_ROOT_MULTISIG, IsmType.MESSAGE_ID_MULTISIG].includes(
        ismType,
      )
    ) {
      this.logger.info(
        `Deploying ${ismType} with deployer (${this.signer.account.address}) as initial owner. ` +
          'Note: Unlike EVM, this ISM type is ownable on Cosmos and ownership can be transferred later.',
      );
    }

    switch (ismType) {
      case IsmType.MERKLE_ROOT_MULTISIG:
        const { response: merkleRootResponse } =
          await this.signer.createMerklerootMultisigIsm({
            validators: ismConfig.validators,
            threshold: ismConfig.threshold,
          });
        return merkleRootResponse.id;
      case IsmType.MESSAGE_ID_MULTISIG:
        const { response: messageIdResponse } =
          await this.signer.createMessageIdMultisigIsm({
            validators: ismConfig.validators,
            threshold: ismConfig.threshold,
          });
        return messageIdResponse.id;
      default:
        throw new Error(`ISM type ${ismType} is not supported on Cosmos`);
    }
  }
}
