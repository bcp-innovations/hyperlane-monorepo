import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { password } from '@inquirer/prompts';
import { Signer, Wallet } from 'ethers';
import { Wallet as ZKSyncWallet } from 'zksync-ethers';

import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import {
  ChainName,
  ChainSubmissionStrategy,
  ChainTechnicalStack,
  MultiProvider,
  TxSubmitterType,
} from '@hyperlane-xyz/sdk';
import { ProtocolType, assert } from '@hyperlane-xyz/utils';

import {
  BaseMultiProtocolSigner,
  IMultiProtocolSigner,
  SignerConfig,
} from './BaseMultiProtocolSigner.js';

export class MultiProtocolSignerFactory {
  static getSignerStrategy(
    chain: ChainName,
    strategyConfig: ChainSubmissionStrategy,
    multiProvider: MultiProvider,
  ): IMultiProtocolSigner {
    const { protocol, technicalStack } = multiProvider.getChainMetadata(chain);

    switch (protocol) {
      case ProtocolType.Ethereum:
        if (technicalStack === ChainTechnicalStack.ZkSync)
          return new ZKSyncSignerStrategy(strategyConfig);
        return new EthereumSignerStrategy(strategyConfig);
      case ProtocolType.Cosmos:
        return new CosmosSignerStrategy(strategyConfig);
      default:
        throw new Error(`Unsupported protocol: ${protocol}`);
    }
  }
}

class EthereumSignerStrategy extends BaseMultiProtocolSigner {
  async getSignerConfig(chain: ChainName): Promise<SignerConfig> {
    const submitter = this.config[chain]?.submitter as {
      type: TxSubmitterType.JSON_RPC;
      privateKey?: string;
    };

    const privateKey =
      submitter?.privateKey ??
      (await password({
        message: `Please enter the private key for chain ${chain}`,
      }));

    return { privateKey };
  }

  async getSigner(config: SignerConfig): Promise<Signer> {
    return new Wallet(config.privateKey);
  }
}

// 99% overlap with EthereumSignerStrategy for the sake of keeping MultiProtocolSignerFactory clean
class ZKSyncSignerStrategy extends BaseMultiProtocolSigner {
  async getSignerConfig(chain: ChainName): Promise<SignerConfig> {
    const submitter = this.config[chain]?.submitter as {
      privateKey?: string;
    };

    const privateKey =
      submitter?.privateKey ??
      (await password({
        message: `Please enter the private key for chain ${chain}`,
      }));

    return { privateKey };
  }

  async getSigner(config: SignerConfig): Promise<Signer> {
    return new ZKSyncWallet(config.privateKey);
  }
}

class CosmosSignerStrategy extends BaseMultiProtocolSigner {
  async getSignerConfig(chain: ChainName): Promise<SignerConfig> {
    const submitter = this.config[chain]?.submitter as {
      privateKey?: string;
      prefix?: string;
    };

    const privateKey =
      submitter?.privateKey ??
      (await password({
        message: `Please enter the private key for chain ${chain}`,
      }));

    const prefix =
      submitter?.prefix ??
      (await password({
        message: `Please enter the prefix for chain ${chain}`,
      }));

    return {
      privateKey,
      extraParams: {
        prefix,
      },
    };
  }

  async getSigner({
    privateKey,
    extraParams,
  }: SignerConfig): Promise<SigningHyperlaneModuleClient> {
    assert(
      extraParams?.provider && extraParams?.prefix,
      'Missing Cosmos Signer arguments',
    );
    const cometClient = extraParams?.provider.getCometClient();

    const wallet = await DirectSecp256k1Wallet.fromKey(
      Buffer.from(privateKey),
      extraParams.prefix,
    );

    return SigningHyperlaneModuleClient.createWithSigner(cometClient, wallet);
  }
}
