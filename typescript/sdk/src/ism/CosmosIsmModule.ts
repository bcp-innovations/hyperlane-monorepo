import {
  REGISTRY,
  SigningHyperlaneModuleClient,
} from '@hyperlane-xyz/cosmos-sdk';
import { Address, assert, deepEquals, rootLogger } from '@hyperlane-xyz/utils';

import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedCosmJsTransaction } from '../providers/ProviderType.js';
import { ChainName } from '../types.js';
import { normalizeConfig } from '../utils/ism.js';

import { CosmosIsmReader } from './CosmosIsmReader.js';
import { IsmConfig, IsmConfigSchema, IsmType } from './types.js';

export class CosmosIsmModule {
  protected readonly logger = rootLogger.child({ module: 'CosmosIsmModule' });
  protected readonly reader: CosmosIsmReader;

  constructor(
    protected readonly multiProvider: MultiProvider,
    protected readonly signer: SigningHyperlaneModuleClient,
    protected readonly mailbox: Address,
  ) {
    this.reader = new CosmosIsmReader(signer);
  }

  public async read(ismAddress: Address): Promise<IsmConfig> {
    return this.reader.deriveIsmConfig(ismAddress);
  }

  // whoever calls update() needs to ensure that targetConfig has a valid owner
  public async update(
    ismAddress: Address,
    expectedConfig: IsmConfig,
  ): Promise<AnnotatedCosmJsTransaction[]> {
    expectedConfig = IsmConfigSchema.parse(expectedConfig);

    // Do not support updating to a custom ISM address
    if (typeof expectedConfig === 'string') {
      throw new Error(
        'Invalid targetConfig: Updating to a custom ISM address is not supported. Please provide a valid ISM configuration.',
      );
    }

    // save current config for comparison
    // normalize the config to ensure it's in a consistent format for comparison
    const actualConfig = normalizeConfig(await this.read(ismAddress));
    expectedConfig = normalizeConfig(expectedConfig);

    assert(
      typeof expectedConfig === 'object',
      'normalized expectedConfig should be an object',
    );

    // if it's a fallback routing ISM, do a mailbox diff check

    // If configs match, no updates needed
    if (deepEquals(actualConfig, expectedConfig)) {
      return [];
    }

    const defaultIsm = await this.deploy({
      chain: '',
      ismConfig: expectedConfig,
    });

    return [
      {
        annotation: `Updating default ISM of Mailbox from ${ismAddress} to ${defaultIsm}`,
        typeUrl: REGISTRY.MsgSetMailbox.proto.type,
        value: REGISTRY.MsgSetMailbox.proto.converter.create({
          owner: actualConfig.owner,
          mailbox_id: this.mailbox,
          default_ism: defaultIsm,
        }),
      },
    ];
  }

  protected async deploy(params: {
    chain: ChainName;
    ismConfig: IsmConfig;
  }): Promise<Address> {
    const { chain, ismConfig } = params;
    if (typeof ismConfig === 'string') {
      return ismConfig;
    }
    const ismType = ismConfig.type;
    this.logger.info(`Deploying ${ismType} to ${chain}`);

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
      case IsmType.TEST_ISM:
        const { response: noopResponse } = await this.signer.createNoopIsm({});
        return noopResponse.id;
      default:
        throw new Error(`ISM type ${ismType} is not supported on Cosmos`);
    }
  }
}
