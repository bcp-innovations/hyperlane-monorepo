import {
  HyperlaneModuleClient,
  SigningHyperlaneModuleClient,
} from '@hyperlane-xyz/cosmos-sdk';
import { Address, WithAddress, rootLogger } from '@hyperlane-xyz/utils';

import {
  HookConfig,
  HookType,
  IgpHookConfig,
  MerkleTreeHookConfig,
} from './types.js';

export class CosmosHookReader {
  protected readonly logger = rootLogger.child({
    module: 'CosmosHookReader',
  });

  constructor(
    protected readonly cosmosProviderOrSigner:
      | HyperlaneModuleClient
      | SigningHyperlaneModuleClient,
  ) {}

  async deriveHookConfig(address: Address): Promise<HookConfig> {
    try {
      const { igp } = await this.cosmosProviderOrSigner.query.postDispatch.Igp({
        id: address,
      });

      if (igp) {
        return this.deriveIgpConfig(address);
      }

      const { merkle_tree_hook } =
        await this.cosmosProviderOrSigner.query.postDispatch.MerkleTreeHook({
          id: address,
        });

      if (merkle_tree_hook) {
        return this.deriveMerkleTreeConfig(address);
      }

      const { noop_hook } =
        await this.cosmosProviderOrSigner.query.postDispatch.NoopHook({
          id: address,
        });

      if (noop_hook) {
        // TODO: should noop hook be supported?
        throw new Error(`Unsupported hook type: NoopHook`);
      }

      throw new Error(`Unsupported hook type for address: ${address}`);
    } catch (error) {
      this.logger.error(`Failed to derive Hook config for ${address}`, error);
      throw error;
    }
  }

  private async deriveIgpConfig(
    address: Address,
  ): Promise<WithAddress<IgpHookConfig>> {
    const { igp } = await this.cosmosProviderOrSigner.query.postDispatch.Igp({
      id: address,
    });

    if (!igp) {
      throw new Error(`IGP not found for address ${address}`);
    }

    // TODO: return remaining properties
    return {
      type: HookType.INTERCHAIN_GAS_PAYMASTER,
      owner: igp.owner,
      beneficiary: '',
      oracleKey: '',
      overhead: {},
      oracleConfig: {},
      address: igp.id,
    };
  }

  private async deriveMerkleTreeConfig(
    address: Address,
  ): Promise<WithAddress<MerkleTreeHookConfig>> {
    const { merkle_tree_hook } =
      await this.cosmosProviderOrSigner.query.postDispatch.MerkleTreeHook({
        id: address,
      });

    if (!merkle_tree_hook) {
      throw new Error(`Merkle Tree Hook not found for address ${address}`);
    }

    // TODO: assertHookType
    return {
      type: HookType.MERKLE_TREE,
      address: merkle_tree_hook.id,
    };
  }
}
