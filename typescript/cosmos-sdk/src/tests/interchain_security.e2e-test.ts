import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import { expect } from 'chai';

import { SigningHyperlaneModuleClient } from '../index.js';

describe('cosmos sdk interchain security e2e tests', async function () {
  this.timeout(100_000);

  // These private keys are only used for accounts on a local test chain
  // and contain no funds
  let alicePK =
    '33913dd43a5d5764f7a23da212a8664fc4f5eedc68db35f3eb4a5c4f046b5b51';
  let signer: SigningHyperlaneModuleClient;

  before(async () => {
    const wallet = await DirectSecp256k1Wallet.fromKey(
      Buffer.from(alicePK, 'hex'),
      'hyp',
    );

    signer = await SigningHyperlaneModuleClient.connectWithSigner(
      'http://127.0.0.1:26657',
      wallet,
      {
        gasPrice: GasPrice.fromString('0.2uhyp'),
      },
    );
  });

  it('create new NOOP ISM', async () => {
    // ARRANGE
    const { isms } = await signer.query.interchainSecurity.Isms({});
    expect(isms).to.be.empty;

    // ACT
    const { response: noopIsm } = await signer.createNoopIsm({});

    // ASSERT
    expect(noopIsm.id).to.be.not.empty;
  });
});
