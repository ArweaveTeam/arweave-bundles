import { Dependencies } from './ar-data-base';

import { getSignatureData, DataItemJson } from './ar-data-base';
import { create, sign, DataItemCreateOptions } from './ar-data-create';
import { decodeData, decodeTag, decodeTagAt, unpackTags } from './ar-data-read';
import { verify  } from './ar-data-verify';

export { create, sign, decodeData, decodeTag, decodeTagAt, unpackTags, verify, DataItemCreateOptions, DataItemJson, getSignatureData }

export function ArDataApi(deps: Dependencies) {
  return {
    create: create.bind(null, deps),
    sign: sign.bind(null, deps),
    verify: verify.bind(null, deps),
    decodeData: decodeData.bind(null, deps),
    decodeTag: decodeTag.bind(null, deps),
    decodeTagAt: decodeTagAt.bind(null, deps), 
    unpackTags: unpackTags.bind(null, deps),
  }
}