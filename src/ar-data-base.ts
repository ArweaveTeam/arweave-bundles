import { deepHash } from "./interface-deep-hash";
import { ArweaveUtils } from "./interface-utils";
import { CryptoInterface } from "./interface-crypto";

/**
 * The depdencies needed for operating on DataItems
 * These methods and interfaces are all available in arweave-js
 */
export interface Dependencies {
  crypto: CryptoInterface;
  utils: ArweaveUtils;
  deepHash: deepHash;
}

/**
 * Serialized format of a DataItem. Json.
 */
export class DataItemJson {
  owner: string = "";
  target: string = "";
  nonce: string = "";
  tags: { name: string; value: string }[] = [];
  data: string = "";
  signature: string = "";
  signatureType: number = 1;
  id: string = "";
}

/**
 * Return the message that should be signed to produce a valid signature
 *
 * @param deps
 * @param d
 */
export async function getSignatureData(
  deps: Dependencies,
  d: DataItemJson
): Promise<Uint8Array> {
  if (d.signatureType) {
    return deps.deepHash([
      deps.utils.stringToBuffer("dataitem"),
      deps.utils.stringToBuffer("1"),
      deps.utils.stringToBuffer(d.signatureType.toString()),
      deps.utils.b64UrlToBuffer(d.owner),
      deps.utils.b64UrlToBuffer(d.target),
      deps.utils.b64UrlToBuffer(d.nonce),
      serializeTags(deps, d.tags),
      deps.utils.b64UrlToBuffer(d.data),
    ]);
  }
  return deps.deepHash([
    deps.utils.stringToBuffer("dataitem"),
    deps.utils.stringToBuffer("1"),
    deps.utils.b64UrlToBuffer(d.owner),
    deps.utils.b64UrlToBuffer(d.target),
    deps.utils.b64UrlToBuffer(d.nonce),
    [
      ...d.tags.map((tag) => [
        deps.utils.b64UrlToBuffer(tag.name),
        deps.utils.b64UrlToBuffer(tag.value),
      ]),
    ],
    deps.utils.b64UrlToBuffer(d.data),
  ]);
}

function serializeTags(deps, tags) {
  let byt = Buffer.from("");
  // we first add the count of tag elements (https://avro.apache.org/docs/1.11.1/specification/#arrays-1)
  byt = Buffer.concat([byt, Buffer.from([zigzag_encode(tags.length)])]);

  // each tag record is encoded following https://avro.apache.org/docs/1.11.1/specification/#arrays-1
  for (let tag of tags) {
    let name = Buffer.from(tag.name);
    let value = Buffer.from(tag.value);

    byt = Buffer.concat([byt, Buffer.from([zigzag_encode(name.byteLength)])]);
    byt = Buffer.concat([byt, name]);
    byt = Buffer.concat([byt, Buffer.from([zigzag_encode(value.byteLength)])]);
    byt = Buffer.concat([byt, value]);
  }
  // we terminate it with a 0 based on https://avro.apache.org/docs/1.11.1/specification/#arrays-1
  byt = Buffer.concat([byt, Buffer.from([zigzag_encode(0)])]);

  return byt;
}

function zigzag_encode(i) {
  return (i >> 31) ^ (i << 1);
}
