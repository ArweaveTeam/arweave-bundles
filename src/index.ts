import { Dependencies } from './ar-data-base';
import { JWKPublicInterface, JWKInterface } from "./interface-jwk";

import { getSignatureData, DataItemJson } from './ar-data-base';
import { createData, sign, addTag, DataItemCreateOptions } from './ar-data-create';
import { decodeData, decodeTag, decodeTagAt, unpackTags } from './ar-data-read';
import { bundleData, unbundleData } from './ar-data-bundle'
import { verify  } from './ar-data-verify';

export { createData as create, sign, decodeData, decodeTag, decodeTagAt, unpackTags, verify, DataItemCreateOptions, DataItemJson, getSignatureData }

export default function ArweaveData(deps: Dependencies) {
  return {
    createData: function (opts: DataItemCreateOptions, jwk: JWKPublicInterface): Promise<DataItemJson> {
      return createData(deps, opts, jwk);
    },
    sign: function (d: DataItemJson, jwk: JWKInterface): Promise<DataItemJson>  {
      return sign(deps, d, jwk);
    },
    addTag: function (d: DataItemJson, name: string, value: string) {
      return addTag(deps, d, name, value);
    },
    verify: function (d: DataItemJson): Promise<boolean> {
      return verify(deps, d);
    },
    decodeData: function (d: DataItemJson, options: { string: boolean } = { string: false }): Promise<string | Uint8Array> {
      return decodeData(deps, d, options);
    },
    decodeTag: function (tag: { name: string, value: string }) {
      return decodeTag(deps, tag);
    },
    decodeTagAt: function (d: DataItemJson, index: number) {
      return decodeTagAt(deps, d, index);
    },
    unpackTags: function (d: DataItemJson): Promise<Record<string, (string | string[])>> {
      return unpackTags(deps, d);
    },
    bundleData: function (txData: any): Promise<{ items: DataItemJson[] }> {
      return bundleData(deps, txData);
    },
    unbundleData: function (txData: any): Promise<DataItemJson[]> {
      return unbundleData(deps, txData);
    }
  }
}
