import { expect } from 'chai';
import { step } from 'mocha-steps';

import {
  bytes32ToAddress,
  isValidAddressEvm,
} from '../../../utils/dist/addresses.js';
import { SigningHyperlaneModuleClient } from '../index.js';

import { createSigner } from './utils.js';

describe('3. cosmos sdk post dispatch e2e tests', async function () {
  this.timeout(100_000);

  let signer: SigningHyperlaneModuleClient;

  before(async () => {
    signer = await createSigner('alice');
  });

  step('create new IGP hook', async () => {
    // ARRANGE
    let igps = await signer.query.postDispatch.Igps({});
    expect(igps.igps).to.have.lengthOf(0);

    const denom = 'uhyp';

    // ACT
    const txResponse = await signer.createIgp({
      denom,
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    const igp = txResponse.response;

    expect(igp.id).to.be.not.empty;
    expect(isValidAddressEvm(bytes32ToAddress(igp.id))).to.be.true;

    igps = await signer.query.postDispatch.Igps({});
    expect(igps.igps).to.have.lengthOf(1);

    let igpQuery = await signer.query.postDispatch.Igp({
      id: igp.id,
    });

    expect(igpQuery.igp).not.to.be.undefined;
    expect(igpQuery.igp?.owner).to.equal(signer.account.address);
    expect(igpQuery.igp?.denom).to.equal(denom);
  });

  step('create new Merkle Tree hook', async () => {
    // ARRANGE
    let merkleTrees = await signer.query.postDispatch.MerkleTreeHooks({});
    expect(merkleTrees.merkle_tree_hooks).to.have.lengthOf(0);

    let mailboxes = await signer.query.core.Mailboxes({});
    expect(mailboxes.mailboxes).to.have.lengthOf(1);

    const mailbox = mailboxes.mailboxes[mailboxes.mailboxes.length - 1];

    // ACT
    const txResponse = await signer.createMerkleTreeHook({
      mailbox_id: mailbox.id,
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    const merleTree = txResponse.response;

    expect(merleTree.id).to.be.not.empty;
    expect(isValidAddressEvm(bytes32ToAddress(merleTree.id))).to.be.true;

    merkleTrees = await signer.query.postDispatch.MerkleTreeHooks({});
    expect(merkleTrees.merkle_tree_hooks).to.have.lengthOf(1);

    let merkleTreeQuery = await signer.query.postDispatch.MerkleTreeHook({
      id: merleTree.id,
    });

    expect(merkleTreeQuery.merkle_tree_hook).not.to.be.undefined;
    expect(merkleTreeQuery.merkle_tree_hook?.owner).to.equal(
      signer.account.address,
    );
    expect(merkleTreeQuery.merkle_tree_hook?.mailbox_id).to.equal(mailbox.id);
  });

  step('create new Noop hook', async () => {
    // ARRANGE
    let noopHooks = await signer.query.postDispatch.NoopHooks({});
    expect(noopHooks.noop_hooks).to.have.lengthOf(0);

    // ACT
    const txResponse = await signer.createNoopHook({});

    // ASSERT
    expect(txResponse.code).to.equal(0);

    const noopHook = txResponse.response;

    expect(noopHook.id).to.be.not.empty;
    expect(isValidAddressEvm(bytes32ToAddress(noopHook.id))).to.be.true;

    noopHooks = await signer.query.postDispatch.NoopHooks({});
    expect(noopHooks.noop_hooks).to.have.lengthOf(1);

    let noopHookQuery = await signer.query.postDispatch.NoopHook({
      id: noopHook.id,
    });

    expect(noopHookQuery.noop_hook).not.to.be.undefined;
    expect(noopHookQuery.noop_hook?.owner).to.equal(signer.account.address);
  });

  step('set destination gas config', async () => {
    // ARRANGE
    let igps = await signer.query.postDispatch.Igps({});
    expect(igps.igps).to.have.lengthOf(1);

    const igp = igps.igps[igps.igps.length - 1];
    const remoteDomainId = 1234;
    const gasOverhead = '10000';
    const gasPrice = '2';
    const tokenExchangeRate = '1';

    let gasConfigs = await signer.query.postDispatch.DestinationGasConfigs({
      id: igp.id,
    });
    expect(gasConfigs.destination_gas_configs).to.have.lengthOf(0);

    // ACT
    const txResponse = await signer.setDestinationGasConfig({
      igp_id: igp.id,
      destination_gas_config: {
        remote_domain: remoteDomainId,
        gas_oracle: {
          token_exchange_rate: tokenExchangeRate,
          gas_price: gasPrice,
        },
        gas_overhead: gasOverhead,
      },
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    gasConfigs = await signer.query.postDispatch.DestinationGasConfigs({
      id: igp.id,
    });
    expect(gasConfigs.destination_gas_configs).to.have.lengthOf(1);

    const gasConfig = gasConfigs.destination_gas_configs[0];

    expect(gasConfig.remote_domain).to.equal(remoteDomainId);
    expect(gasConfig.gas_overhead).to.equal(gasOverhead);
    expect(gasConfig.gas_oracle?.gas_price).to.equal(gasPrice);
    expect(gasConfig.gas_oracle?.token_exchange_rate).to.equal(
      tokenExchangeRate,
    );
  });

  step('set new IGP owner', async () => {
    // ARRANGE
    const newOwner = (await createSigner('bob')).account.address;

    let igps = await signer.query.postDispatch.Igps({});
    expect(igps.igps).to.have.lengthOf(1);

    const igpBefore = igps.igps[igps.igps.length - 1];
    expect(igpBefore.owner).to.equal(signer.account.address);

    // ACT
    const txResponse = await signer.setIgpOwner({
      igp_id: igpBefore.id,
      new_owner: newOwner,
    });

    // ASSERT
    expect(txResponse.code).to.equal(0);

    igps = await signer.query.postDispatch.Igps({});
    expect(igps.igps).to.have.lengthOf(1);

    const igpAfter = igps.igps[igps.igps.length - 1];

    expect(igpAfter.id).to.equal(igpBefore.id);
    expect(igpAfter.owner).to.equal(newOwner);
    expect(igpAfter.denom).to.equal(igpBefore.denom);
  });
});
