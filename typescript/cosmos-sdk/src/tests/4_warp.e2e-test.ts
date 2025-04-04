import { expect } from 'chai';
import { step } from 'mocha-steps';

import { HypTokenType } from '../../../cosmos-types/src/types/hyperlane/warp/v1/types.js';
import {
  bytes32ToAddress,
  isValidAddressEvm,
} from '../../../utils/dist/addresses.js';
import { SigningHyperlaneModuleClient } from '../index.js';

import { createSigner } from './utils.js';

describe('4. cosmos sdk warp e2e tests', async function () {
  this.timeout(100_000);

  let signer: SigningHyperlaneModuleClient;

  before(async () => {
    signer = await createSigner('alice');
  });

  step('create new collateral token', async () => {
    // ARRANGE
    let tokens = await signer.query.warp.Tokens({});
    expect(tokens.tokens).to.have.lengthOf(0);

    let mailboxes = await signer.query.core.Mailboxes({});
    expect(mailboxes.mailboxes).to.have.lengthOf(1);

    const mailbox = mailboxes.mailboxes[mailboxes.mailboxes.length - 1];
    const denom = 'uhyp';

    // ACT
    const txResponse = await signer.createCollateralToken({
      origin_mailbox: mailbox.id,
      origin_denom: denom,
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    const token = txResponse.response;

    expect(token.id).to.be.not.empty;
    expect(isValidAddressEvm(bytes32ToAddress(token.id))).to.be.true;

    tokens = await signer.query.warp.Tokens({});
    expect(tokens.tokens).to.have.lengthOf(1);

    let tokenQuery = await signer.query.warp.Token({
      id: token.id,
    });

    expect(tokenQuery.token).not.to.be.undefined;
    expect(tokenQuery.token?.owner).to.equal(signer.account.address);
    expect(tokenQuery.token?.origin_mailbox).to.equal(mailbox.id);
    expect(tokenQuery.token?.origin_denom).to.equal(denom);
    expect(tokenQuery.token?.ism_id).to.be.empty;
    expect(tokenQuery.token?.token_type).to.equal(
      HypTokenType.HYP_TOKEN_TYPE_COLLATERAL,
    );
  });

  step('create new synthetic token', async () => {
    // ARRANGE
    let tokens = await signer.query.warp.Tokens({});
    expect(tokens.tokens).to.have.lengthOf(1);

    let mailboxes = await signer.query.core.Mailboxes({});
    expect(mailboxes.mailboxes).to.have.lengthOf(1);

    const mailbox = mailboxes.mailboxes[mailboxes.mailboxes.length - 1];

    // ACT
    const txResponse = await signer.createSyntheticToken({
      origin_mailbox: mailbox.id,
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    const token = txResponse.response;

    expect(token.id).to.be.not.empty;
    expect(isValidAddressEvm(bytes32ToAddress(token.id))).to.be.true;

    tokens = await signer.query.warp.Tokens({});
    expect(tokens.tokens).to.have.lengthOf(2);

    let tokenQuery = await signer.query.warp.Token({
      id: token.id,
    });

    expect(tokenQuery.token).not.to.be.undefined;
    expect(tokenQuery.token?.owner).to.equal(signer.account.address);
    expect(tokenQuery.token?.origin_mailbox).to.equal(mailbox.id);
    expect(tokenQuery.token?.origin_denom).to.equal(`hyperlane/${token.id}`);
    expect(tokenQuery.token?.ism_id).to.be.empty;
    expect(tokenQuery.token?.token_type).to.equal(
      HypTokenType.HYP_TOKEN_TYPE_SYNTHETIC,
    );
  });

  step('set token', async () => {
    // ARRANGE
    const newOwner = (await createSigner('bob')).account.address;

    let tokens = await signer.query.warp.Tokens({});
    expect(tokens.tokens).to.have.lengthOf(2);

    const tokenBefore = tokens.tokens[tokens.tokens.length - 1];

    // ACT
    const txResponse = await signer.setToken({
      token_id: tokenBefore.id,
      ism_id: '',
      new_owner: newOwner,
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    tokens = await signer.query.warp.Tokens({});
    expect(tokens.tokens).to.have.lengthOf(2);

    const tokenAfter = tokens.tokens[tokens.tokens.length - 1];

    expect(tokenAfter.id).to.equal(tokenBefore.id);
    expect(tokenAfter.owner).to.equal(newOwner);
    expect(tokenAfter.origin_mailbox).to.equal(tokenBefore.origin_mailbox);
    expect(tokenAfter.origin_denom).to.equal(tokenBefore.origin_denom);
    expect(tokenAfter.ism_id).to.equal(tokenBefore.ism_id);
    expect(tokenAfter.token_type).to.equal(tokenBefore.token_type);
  });
});
