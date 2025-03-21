import { Signer } from 'ethers';
import { Logger } from 'pino';

import {
  ChainName,
  ChainSubmissionStrategy,
  MultiProtocolProvider,
  MultiProvider,
} from '@hyperlane-xyz/sdk';
import { ProtocolType, assert, rootLogger } from '@hyperlane-xyz/utils';

import { ENV } from '../../../utils/env.js';

import {
  IMultiProtocolSigner,
  SignerConfig,
  TypedSigner,
} from './BaseMultiProtocolSigner.js';
import { MultiProtocolSignerFactory } from './MultiProtocolSignerFactory.js';

export interface MultiProtocolSignerOptions {
  logger?: Logger;
  key?: string;
}

/**
 * @title MultiProtocolSignerManager
 * @dev Context manager for signers across multiple protocols
 */
export class MultiProtocolSignerManager {
  protected readonly signerStrategies: Map<ChainName, IMultiProtocolSigner>;
  protected readonly signers: Map<ChainName, TypedSigner>;
  public readonly logger: Logger;

  constructor(
    protected readonly submissionStrategy: ChainSubmissionStrategy,
    protected readonly chains: ChainName[],
    protected readonly multiProvider: MultiProvider,
    private multiProtocolProvider: MultiProtocolProvider,
    protected readonly options: MultiProtocolSignerOptions = {},
  ) {
    this.logger =
      options?.logger ||
      rootLogger.child({
        module: 'MultiProtocolSignerManager',
      });
    this.signerStrategies = new Map();
    this.signers = new Map();
    this.initializeStrategies();
  }

  /**
   * @notice Sets up chain-specific signer strategies
   */
  protected initializeStrategies(): void {
    for (const chain of this.chains) {
      if (this.multiProvider.getProtocol(chain) !== ProtocolType.Ethereum) {
        this.logger.debug(
          `Skipping signer strategy initialization for non-EVM chain ${chain}`,
        );
        continue;
      }
      const strategy = MultiProtocolSignerFactory.getSignerStrategy(
        chain,
        this.submissionStrategy,
        this.multiProvider,
      );
      this.signerStrategies.set(chain, strategy);
    }
  }

  /**
   * @dev Configures signers for EVM chains in MultiProvider
   */
  async getMultiProvider(): Promise<MultiProvider> {
    const ethereumChains = this.chains.filter(
      (chain) =>
        this.multiProvider.getChainMetadata(chain).protocol ===
        ProtocolType.Ethereum,
    );

    for (const chain of ethereumChains) {
      const signer = await this.initSigner(chain);
      this.multiProvider.setSigner(chain, signer as Signer);
    }

    return this.multiProvider;
  }

  /**
   * @notice Creates signer for specific chain
   */
  async initSigner(chain: ChainName): Promise<TypedSigner> {
    const config = await this.resolveConfig(chain);
    const signerStrategy = this.getSignerStrategyOrFail(chain);
    return signerStrategy.getSigner(config);
  }

  /**
   * @notice Creates signers for all chains
   */
  async initAllSigners(): Promise<typeof this.signers> {
    const signerConfigs = await this.resolveAllConfigs();

    for (const { chain, privateKey, extraParams } of signerConfigs) {
      const signerStrategy = this.signerStrategies.get(chain);
      if (signerStrategy) {
        const { protocol } = this.multiProvider.getChainMetadata(chain);

        if (protocol === ProtocolType.Cosmos) {
          const provider = await this.multiProtocolProvider?.getCosmJsProvider(
            chain,
          );

          this.signers.set(
            chain,
            await signerStrategy.getSigner({
              privateKey,
              extraParams: { ...extraParams, provider },
            }),
          );
        } else {
          // evm chains
          this.signers.set(
            chain,
            await signerStrategy.getSigner({ privateKey }),
          );
        }
      }
    }

    return this.signers;
  }

  /**
   * @notice Resolves all chain configurations
   */
  private async resolveAllConfigs(): Promise<
    Array<{ chain: ChainName } & SignerConfig>
  > {
    return Promise.all(this.chains.map((chain) => this.resolveConfig(chain)));
  }

  /**
   * @notice Resolves single chain configuration
   */
  private async resolveConfig(
    chain: ChainName,
  ): Promise<{ chain: ChainName } & SignerConfig> {
    const { protocol } = this.multiProvider.getChainMetadata(chain);

    // For Cosmos, we must use strategy config
    if (protocol === ProtocolType.Cosmos) {
      return this.resolveCosmosConfig(chain);
    }

    // For other protocols, try CLI/ENV keys first, then fallback to strategy
    const config = await this.extractPrivateKey(chain);
    return { chain, ...config };
  }

  /**
   * @notice Gets private key from strategy
   */
  private async extractPrivateKey(chain: ChainName): Promise<SignerConfig> {
    if (this.options.key) {
      this.logger.info(
        `Using private key passed via CLI --key flag for chain ${chain}`,
      );
      return { privateKey: this.options.key };
    }

    if (ENV.HYP_KEY) {
      this.logger.info(`Using private key from .env for chain ${chain}`);
      return { privateKey: ENV.HYP_KEY };
    }

    const signerStrategy = this.getSignerStrategyOrFail(chain);
    const strategyConfig = await signerStrategy.getSignerConfig(chain);
    assert(
      strategyConfig.privateKey,
      `No private key found for chain ${chain}`,
    );
    this.logger.info(
      `Extracting private key from strategy config/user prompt for chain ${chain}`,
    );

    return { privateKey: strategyConfig.privateKey };
  }

  private async resolveCosmosConfig(
    chain: ChainName,
  ): Promise<{ chain: ChainName } & SignerConfig> {
    const signerStrategy = this.getSignerStrategyOrFail(chain);
    const strategyConfig = await signerStrategy.getSignerConfig(chain);
    const provider = this.multiProtocolProvider.getCosmJsProvider(chain);

    assert(
      strategyConfig.privateKey,
      `No private key found for chain ${chain}`,
    );
    assert(provider, 'No Cosmos Provider found');

    this.logger.info(`Using strategy config for Cosmos chain ${chain}`);

    return {
      chain,
      privateKey: strategyConfig.privateKey,
      extraParams: { provider },
    };
  }

  private getSignerStrategyOrFail(chain: ChainName): IMultiProtocolSigner {
    const strategy = this.signerStrategies.get(chain);
    assert(strategy, `No signer strategy found for chain ${chain}`);
    return strategy;
  }
}
