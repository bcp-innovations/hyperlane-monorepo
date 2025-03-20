import { useMemo } from 'react';

import { ChainName, MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { Address, HexString, ProtocolType } from '@hyperlane-xyz/utils';

import { widgetLogger } from '../logger.js';

import {
  useCosmosAccount,
  useCosmosActiveChain,
  useCosmosConnectFn,
  useCosmosDisconnectFn,
  useCosmosTransactionFns,
  useCosmosWalletDetails,
} from './cosmos.js';
import {
  useEthereumAccount,
  useEthereumActiveChain,
  useEthereumConnectFn,
  useEthereumDisconnectFn,
  useEthereumTransactionFns,
  useEthereumWalletDetails,
} from './ethereum.js';
import {
  useSolanaAccount,
  useSolanaActiveChain,
  useSolanaConnectFn,
  useSolanaDisconnectFn,
  useSolanaTransactionFns,
  useSolanaWalletDetails,
} from './solana.js';
// import {
//   useStarknetAccount,
//   useStarknetActiveChain,
//   useStarknetConnectFn,
//   useStarknetDisconnectFn,
//   useStarknetTransactionFns,
//   useStarknetWalletDetails,
// } from './starknet.js';
import {
  AccountInfo,
  ActiveChainInfo,
  ChainTransactionFns,
  WalletDetails,
} from './types.js';

const logger = widgetLogger.child({
  module: 'walletIntegrations/multiProtocol',
});

export function useAccounts(
  multiProvider: MultiProtocolProvider,
  blacklistedAddresses: Address[] = [],
): {
  accounts: Record<ProtocolType, AccountInfo>;
  readyAccounts: Array<AccountInfo>;
} {
  const evmAccountInfo = useEthereumAccount(multiProvider);
  const solAccountInfo = useSolanaAccount(multiProvider);
  const cosmAccountInfo = useCosmosAccount(multiProvider);
  // const starknetAccountInfo = useStarknetAccount(multiProvider);
  // Filtered ready accounts
  const readyAccounts = useMemo(
    () =>
      [
        evmAccountInfo,
        solAccountInfo,
        cosmAccountInfo,
        // starknetAccountInfo,
      ].filter((a) => a.isReady),
    [evmAccountInfo, solAccountInfo, cosmAccountInfo],
  );

  // Check if any of the ready accounts are blacklisted
  const readyAddresses = readyAccounts
    .map((a) => a.addresses)
    .flat()
    .map((a) => a.address.toLowerCase());
  if (readyAddresses.some((a) => blacklistedAddresses.includes(a))) {
    throw new Error('Wallet address is blacklisted');
  }

  return useMemo(
    () => ({
      accounts: {
        [ProtocolType.Ethereum]: evmAccountInfo,
        [ProtocolType.Sealevel]: solAccountInfo,
        [ProtocolType.Cosmos]: cosmAccountInfo,
        [ProtocolType.Starknet]: cosmAccountInfo,
      },
      readyAccounts,
    }),
    [
      evmAccountInfo,
      solAccountInfo,
      cosmAccountInfo,
      cosmAccountInfo,
      readyAccounts,
    ],
  );
}

export function useAccountForChain(
  multiProvider: MultiProtocolProvider,
  chainName?: ChainName,
): AccountInfo | undefined {
  const { accounts } = useAccounts(multiProvider);
  const protocol = chainName ? multiProvider.getProtocol(chainName) : undefined;
  if (!chainName || !protocol) return undefined;
  return accounts?.[protocol];
}

export function useAccountAddressForChain(
  multiProvider: MultiProtocolProvider,
  chainName?: ChainName,
): Address | undefined {
  const { accounts } = useAccounts(multiProvider);
  return getAccountAddressForChain(multiProvider, chainName, accounts);
}

export function getAccountAddressForChain(
  multiProvider: MultiProtocolProvider,
  chainName?: ChainName,
  accounts?: Record<ProtocolType, AccountInfo>,
): Address | undefined {
  if (!chainName || !accounts) return undefined;
  const protocol = multiProvider.getProtocol(chainName);
  const account = accounts[protocol];
  if (protocol === ProtocolType.Cosmos) {
    return account?.addresses.find((a) => a.chainName === chainName)?.address;
  } else {
    // Use first because only cosmos has the notion of per-chain addresses
    return account?.addresses[0]?.address;
  }
}

export function getAccountAddressAndPubKey(
  multiProvider: MultiProtocolProvider,
  chainName?: ChainName,
  accounts?: Record<ProtocolType, AccountInfo>,
): { address?: Address; publicKey?: Promise<HexString> } {
  const address = getAccountAddressForChain(multiProvider, chainName, accounts);
  if (!accounts || !chainName || !address) return {};
  const protocol = multiProvider.getProtocol(chainName);
  const publicKey = accounts[protocol]?.publicKey;
  return { address, publicKey };
}

export function useWalletDetails(): Record<ProtocolType, WalletDetails> {
  const evmWallet = useEthereumWalletDetails();
  const solWallet = useSolanaWalletDetails();
  const cosmosWallet = useCosmosWalletDetails();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: evmWallet,
      [ProtocolType.Sealevel]: solWallet,
      [ProtocolType.Cosmos]: cosmosWallet,
      [ProtocolType.Starknet]: cosmosWallet,
    }),
    [evmWallet, solWallet, cosmosWallet, cosmosWallet],
  );
}

export function useConnectFns(): Record<ProtocolType, () => void> {
  const onConnectEthereum = useEthereumConnectFn();
  const onConnectSolana = useSolanaConnectFn();
  const onConnectCosmos = useCosmosConnectFn();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: onConnectEthereum,
      [ProtocolType.Sealevel]: onConnectSolana,
      [ProtocolType.Cosmos]: onConnectCosmos,
      [ProtocolType.Starknet]: onConnectCosmos,
    }),
    [onConnectEthereum, onConnectSolana, onConnectCosmos, onConnectCosmos],
  );
}

export function useDisconnectFns(): Record<ProtocolType, () => Promise<void>> {
  const disconnectEvm = useEthereumDisconnectFn();
  const disconnectSol = useSolanaDisconnectFn();
  const disconnectCosmos = useCosmosDisconnectFn();
  const disconnectStarknet = useCosmosDisconnectFn();

  const onClickDisconnect =
    (env: ProtocolType, disconnectFn?: () => Promise<void> | void) =>
    async () => {
      try {
        if (!disconnectFn) throw new Error('Disconnect function is null');
        await disconnectFn();
      } catch (error) {
        logger.error(`Error disconnecting from ${env} wallet`, error);
      }
    };

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: onClickDisconnect(
        ProtocolType.Ethereum,
        disconnectEvm,
      ),
      [ProtocolType.Sealevel]: onClickDisconnect(
        ProtocolType.Sealevel,
        disconnectSol,
      ),
      [ProtocolType.Cosmos]: onClickDisconnect(
        ProtocolType.Cosmos,
        disconnectCosmos,
      ),
      [ProtocolType.Starknet]: onClickDisconnect(
        ProtocolType.Starknet,
        disconnectStarknet,
      ),
    }),
    [disconnectEvm, disconnectSol, disconnectCosmos, disconnectStarknet],
  );
}

export function useActiveChains(multiProvider: MultiProtocolProvider): {
  chains: Record<ProtocolType, ActiveChainInfo>;
  readyChains: Array<ActiveChainInfo>;
} {
  const evmChain = useEthereumActiveChain(multiProvider);
  const solChain = useSolanaActiveChain(multiProvider);
  const cosmChain = useCosmosActiveChain(multiProvider);
  const starknetChain = useCosmosActiveChain(multiProvider);

  const readyChains = useMemo(
    () =>
      [evmChain, solChain, cosmChain, starknetChain].filter(
        (c) => !!c.chainDisplayName,
      ),
    [evmChain, solChain, cosmChain, starknetChain],
  );

  return useMemo(
    () => ({
      chains: {
        [ProtocolType.Ethereum]: evmChain,
        [ProtocolType.Sealevel]: solChain,
        [ProtocolType.Cosmos]: cosmChain,
        [ProtocolType.Starknet]: starknetChain,
      },
      readyChains,
    }),
    [evmChain, solChain, cosmChain, readyChains, starknetChain],
  );
}

export function useTransactionFns(
  multiProvider: MultiProtocolProvider,
): Record<ProtocolType, ChainTransactionFns> {
  const { switchNetwork: onSwitchEvmNetwork, sendTransaction: onSendEvmTx } =
    useEthereumTransactionFns(multiProvider);
  const { switchNetwork: onSwitchSolNetwork, sendTransaction: onSendSolTx } =
    useSolanaTransactionFns(multiProvider);
  const { switchNetwork: onSwitchCosmNetwork, sendTransaction: onSendCosmTx } =
    useCosmosTransactionFns(multiProvider);
  const {
    switchNetwork: onSwitchStarknetNetwork,
    sendTransaction: onSendStarknetTx,
  } = useCosmosTransactionFns(multiProvider);

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: {
        sendTransaction: onSendEvmTx,
        switchNetwork: onSwitchEvmNetwork,
      },
      [ProtocolType.Sealevel]: {
        sendTransaction: onSendSolTx,
        switchNetwork: onSwitchSolNetwork,
      },
      [ProtocolType.Cosmos]: {
        sendTransaction: onSendCosmTx,
        switchNetwork: onSwitchCosmNetwork,
      },
      [ProtocolType.Starknet]: {
        sendTransaction: onSendStarknetTx,
        switchNetwork: onSwitchStarknetNetwork,
      },
    }),
    [
      onSendEvmTx,
      onSendSolTx,
      onSwitchEvmNetwork,
      onSwitchSolNetwork,
      onSendCosmTx,
      onSwitchCosmNetwork,
      onSendStarknetTx,
      onSwitchStarknetNetwork,
    ],
  );
}
