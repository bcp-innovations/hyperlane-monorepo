import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';

import { SigningHyperlaneModuleClient } from '../index.js';

// These private keys are only used for accounts on a local test chain
// and contain no funds
const ALICE_PK =
  '33913dd43a5d5764f7a23da212a8664fc4f5eedc68db35f3eb4a5c4f046b5b51';

export const createSigner = async () => {
  const wallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(ALICE_PK, 'hex'),
    'hyp',
  );

  return SigningHyperlaneModuleClient.connectWithSigner(
    'http://127.0.0.1:26657',
    wallet,
    {
      gasPrice: GasPrice.fromString('0.2uhyp'),
    },
  );
};
