import { ChainName, CosmosIsmReader, EvmIsmReader } from '@hyperlane-xyz/sdk';
import { Address, ProtocolType, stringifyObject } from '@hyperlane-xyz/utils';

import { CommandContext } from '../context/types.js';
import { log, logBlue, logRed } from '../logger.js';
import { resolveFileFormat, writeFileAtPath } from '../utils/files.js';

/**
 * Read ISM config for a specified chain and address, logging or writing result to file.
 */
export async function readIsmConfig({
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
      const ismReader = new EvmIsmReader(context.multiProvider, chain);
      const config = await ismReader.deriveIsmConfig(address);
      const stringConfig = stringifyObject(config, resolveFileFormat(out), 2);
      if (!out) {
        logBlue(`ISM Config at ${address} on ${chain}:`);
        log(stringConfig);
      } else {
        writeFileAtPath(out, stringConfig + '\n');
        logBlue(`ISM Config written to ${out}.`);
      }
      return;
    }
    case ProtocolType.Cosmos: {
      const cosmosProvider =
        await context.multiProtocolProvider!.getCosmJsProvider(chain);
      const ismReader = new CosmosIsmReader(cosmosProvider);
      const config = await ismReader.deriveIsmConfig(address);
      const stringConfig = stringifyObject(config, resolveFileFormat(out), 2);
      if (!out) {
        logBlue(`ISM Config at ${address} on ${chain}:`);
        log(stringConfig);
      } else {
        writeFileAtPath(out, stringConfig + '\n');
        logBlue(`ISM Config written to ${out}.`);
      }
      return;
    }
    default: {
      logRed(`Chain with protocol type ${protocolType} is not supported`);
    }
  }
}
