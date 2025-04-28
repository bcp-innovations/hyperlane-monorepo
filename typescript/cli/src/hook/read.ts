import { ChainName, CosmosHookReader, EvmHookReader } from '@hyperlane-xyz/sdk';
import { Address, ProtocolType, stringifyObject } from '@hyperlane-xyz/utils';

import { CommandContext } from '../context/types.js';
import { log, logBlue, logRed } from '../logger.js';
import { resolveFileFormat, writeFileAtPath } from '../utils/files.js';

/**
 * Read Hook config for a specified chain and address, logging or writing result to file.
 */
export async function readHookConfig({
  context,
  chain,
  address,
  out,
}: {
  context: CommandContext;
  chain: ChainName;
  address: Address;
  out?: string;
}): Promise<void> {
  const protocolType = context.multiProvider.getProtocol(chain);

  switch (protocolType) {
    case ProtocolType.Ethereum: {
      const hookReader = new EvmHookReader(context.multiProvider, chain);
      const config = await hookReader.deriveHookConfig(address);
      const stringConfig = stringifyObject(config, resolveFileFormat(out), 2);
      if (!out) {
        logBlue(`Hook Config at ${address} on ${chain}:`);
        log(stringConfig);
      } else {
        writeFileAtPath(out, stringConfig + '\n');
        logBlue(`Hook Config written to ${out}.`);
      }
      return;
    }
    case ProtocolType.Cosmos: {
      const cosmosProvider =
        await context.multiProtocolProvider!.getCosmJsProvider(chain);
      const hookReader = new CosmosHookReader(
        context.multiProvider,
        cosmosProvider,
      );
      const config = await hookReader.deriveHookConfig(address);
      const stringConfig = stringifyObject(config, resolveFileFormat(out), 2);
      if (!out) {
        logBlue(`Hook Config at ${address} on ${chain}:`);
        log(stringConfig);
      } else {
        writeFileAtPath(out, stringConfig + '\n');
        logBlue(`Hook Config written to ${out}.`);
      }
      return;
    }
    default: {
      logRed(`Chain with protocol type ${protocolType} is not supported`);
    }
  }
}
