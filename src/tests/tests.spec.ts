
import { expect } from 'chai';

import ArweaveData from '../'

// Import deps from Arweave-Js
import Arweave from 'arweave/node';
import deepHash from 'arweave/node/lib/deepHash';
import { readFileSync } from 'fs';

// Just used for some checks. 
const _arweave = Arweave.init({ host: 'arweave.net', port: '443', protocol: 'https' });

const wallet0 = JSON.parse(readFileSync(__dirname + '/test_key0.json').toString());
const wallet1 = JSON.parse(readFileSync(__dirname + '/test_key1.json').toString());

const TEST_STRING = 'HELLOWORLD_TEST_STRING'; 
const TEST_TAGS = [ { name: 'MyTag', value: '0'}, {name: "OtherTag", value: "Foo" }, { name: "MyTag", value: '1' } ];
const VALID_BASE64U = 'LS0t'
const INVALID_BASE64U = 'LS0t*&'

const deps = {
  utils: Arweave.utils,
  crypto: Arweave.crypto,
  deepHash: deepHash,
}

const Data = ArweaveData(deps);

describe('Data API - basic', function() {
  it('should encode and decode string data', async function() {
    const item = await Data.createData({ data: TEST_STRING }, wallet0);
    expect(item.data).to.not.equal(TEST_STRING);
    expect(await Data.decodeData(item, { string: true })).to.equal(TEST_STRING)
  })
})

describe('Data API - verification', function() {
  
  it('should verify a valid signed DataItem', async function() {
    
    const item0 = await Data.createData({ data: TEST_STRING, tags: TEST_TAGS }, wallet0);
    const signed = await Data.sign(item0, wallet0);
    const verified = await Data.verify(signed);
    
    expect(verified).to.equal(true);
  })

  
  it('should fail to verify a DataItem with no signature or id', async function() {
    const item0 = await Data.createData({ data: 'TESTSTRINGA'}, wallet0);
    
    expect(
      await Data.verify(item0)
    ).to.equal(false);
    
    const signed = await Data.sign(item0, wallet0);
    signed.id = '';
    
    expect(
      await Data.verify(signed)
    ).to.equal(false);

    const signed2 = await Data.sign(item0, wallet0);
    signed.signature = '';
    
    expect(
      await Data.verify(signed2)
    ).to.equal(false);
  })

  it('should fail to verify a DataItem with a invalid owner', async function() {
    const item0 = await Data.createData({ data: 'TESTSTRINGA'}, wallet0);
    
    const signed = await Data.sign(item0, wallet0);
    
    expect(
      await Data.verify(signed)
    ).to.equal(true);

    signed.owner = wallet1.n;
    
    expect(
      await Data.verify(signed)
    ).to.equal(false);

  })

  it('should fail to verify a DataItem with a modified or invalid id or signature', async function() {
    
    const item0 = await Data.createData({ data: 'TESTSTRINGA' }, wallet0);
    
    const signed = await Data.sign(item0, wallet0);
    
    const correctId = signed.id;

    signed.id = `XXXX${signed.id.substr(4)}`
    
    expect(
      await Data.verify(signed)
    ).to.equal(false);
    
    signed.id = `FOO`
    
    expect(
      await Data.verify(signed)
    ).to.equal(false);
    
    signed.id = INVALID_BASE64U
    
    expect(
      await Data.verify(signed)
    ).to.equal(false);

    signed.id = correctId

    expect(
      await Data.verify(signed)
    ).to.equal(true);

    const signed2 = await Data.sign(item0, wallet0);
    
    const correctSignature = signed2.signature;

    signed2.signature = ''

    expect(
      await Data.verify(signed)
    ).to.equal(false);

    signed2.signature = VALID_BASE64U

    expect(
      await Data.verify(signed)
    ).to.equal(false);

    signed2.signature = INVALID_BASE64U 

    expect(
      await Data.verify(signed)
    ).to.equal(false);

    signed2.signature = correctSignature 

    expect(
      await Data.verify(signed)
    ).to.equal(true);
    
  })

  it('should fail to verify a DataItem with a modified nonce', async function() {
    const item0 = await Data.createData({ data: 'TESTSTRINGA', nonce: VALID_BASE64U }, wallet0);
    const signed = await Data.sign(item0, wallet0);
    signed.nonce = signed.nonce + VALID_BASE64U;
    expect(
      await Data.verify(signed)
    ).to.equal(false);
  })

  it('should fail to verify a DataItem with invalid Base64', async function() {
    const item0 = await Data.createData({ data: 'TESTSTRINGA', nonce: VALID_BASE64U }, wallet0);
    const signed = await Data.sign(item0, wallet0);
    signed.data = INVALID_BASE64U
    expect(
      await Data.verify(signed)
    ).to.equal(false);
  })

  it('should fail to verify a DataItem with modified tags', async function() {
    const item0 = await Data.createData({ data: 'TESTSTRINGA', tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0);
    const signed = await Data.sign(item0, wallet0);
    expect(
      await Data.verify(signed)
    ).to.equal(true);
    
    signed.tags = signed.tags.slice(1);

    expect(
      await Data.verify(signed)
    ).to.equal(false);
  })

  it('should fail to verify a DataItem with invalid tags', async function() {
    const item0 = await Data.createData({ data: 'TESTSTRINGA', tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0);
    const signed = await Data.sign(item0, wallet0);
    
    signed.tags[0].name = INVALID_BASE64U;

    expect(
      await Data.verify(signed)
    ).to.equal(false);
  })

})





