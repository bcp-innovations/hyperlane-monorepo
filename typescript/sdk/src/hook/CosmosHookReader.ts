import {
  HyperlaneModuleClient,
  SigningHyperlaneModuleClient,
} from '@hyperlane-xyz/cosmos-sdk';
import { Address, WithAddress, rootLogger } from '@hyperlane-xyz/utils';

import { MultiProvider } from '../providers/MultiProvider.js';

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
    protected readonly multiProvider: MultiProvider,
    protected readonly cosmosProviderOrSigner:
      | HyperlaneModuleClient
      | SigningHyperlaneModuleClient,
  ) {}

  async deriveHookConfig(address: Address): Promise<HookConfig> {
    try {
      const { igps } =
        await this.cosmosProviderOrSigner.query.postDispatch.Igps({});

      if (igps.some((igp) => igp.id === address)) {
        return this.deriveIgpConfig(address);
      }

      const { merkle_tree_hooks } =
        await this.cosmosProviderOrSigner.query.postDispatch.MerkleTreeHooks(
          {},
        );

      if (merkle_tree_hooks.some((merkleTree) => merkleTree.id === address)) {
        return this.deriveMerkleTreeConfig(address);
      }

      const { noop_hooks } =
        await this.cosmosProviderOrSigner.query.postDispatch.NoopHooks({});

      if (noop_hooks.some((noopHook) => noopHook.id === address)) {
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

    const { destination_gas_configs } =
      await this.cosmosProviderOrSigner.query.postDispatch.DestinationGasConfigs(
        {
          id: igp.id,
        },
      );

    const overhead: IgpHookConfig['overhead'] = {};
    const oracleConfig: IgpHookConfig['oracleConfig'] = {};

    destination_gas_configs.forEach((gasConfig) => {
      const { name, nativeToken } = this.multiProvider.getChainMetadata(
        gasConfig.remote_domain,
      );
      overhead[name] = parseInt(gasConfig.gas_overhead);
      oracleConfig[name] = {
        gasPrice: gasConfig.gas_oracle?.gas_price ?? '',
        tokenExchangeRate: gasConfig.gas_oracle?.token_exchange_rate ?? '',
        tokenDecimals: nativeToken?.decimals,
      };
    });

    return {
      type: HookType.INTERCHAIN_GAS_PAYMASTER,
      owner: igp.owner,
      beneficiary: igp.owner,
      oracleKey: igp.owner,
      overhead,
      oracleConfig,
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

    return {
      type: HookType.MERKLE_TREE,
      address: merkle_tree_hook.id,
    };
  }
}
