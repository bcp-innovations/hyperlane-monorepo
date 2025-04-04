import { expect } from 'chai';
import { step } from 'mocha-steps';

import {
  bytes32ToAddress,
  isValidAddressEvm,
} from '../../../utils/dist/addresses.js';
import { SigningHyperlaneModuleClient } from '../index.js';

import { createSigner } from './utils.js';

describe('cosmos sdk core e2e tests', async function () {
  this.timeout(100_000);

  let signer: SigningHyperlaneModuleClient;

  before(async () => {
    signer = await createSigner();
  });

  step('create new Mailbox', async () => {
    // ARRANGE
    let mailboxes = await signer.query.core.Mailboxes({});
    expect(mailboxes.mailboxes).to.have.lengthOf(0);

    const { isms } = await signer.query.interchainSecurity.DecodedIsms({});
    // we take the latest created ISM which is a MerkleRootMultisigISM
    const ismId = isms[isms.length - 1].id;

    const domainId = 1234;

    // ACT
    const { response: mailbox } = await signer.createMailbox({
      local_domain: domainId,
      default_ism: ismId,
      default_hook: '',
      required_hook: '',
    });

    // ASSERT
    expect(mailbox.id).to.be.not.empty;
    expect(isValidAddressEvm(bytes32ToAddress(mailbox.id))).to.be.true;

    mailboxes = await signer.query.core.Mailboxes({});
    expect(mailboxes.mailboxes).to.have.lengthOf(1);

    let mailboxQuery = await signer.query.core.Mailbox({
      id: mailbox.id,
    });

    expect(mailboxQuery.mailbox).not.to.be.undefined;
    expect(mailboxQuery.mailbox!.id).to.equal(mailbox.id);
    expect(mailboxQuery.mailbox!.local_domain).to.equal(domainId);
    expect(mailboxQuery.mailbox!.default_ism).to.equal(ismId);
    expect(mailboxQuery.mailbox!.default_hook).to.be.empty;
    expect(mailboxQuery.mailbox!.required_hook).to.be.empty;
  });
});
