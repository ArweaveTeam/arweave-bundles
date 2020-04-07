
import { create, decodeData, ArDataApi  } from '../src'

import Arweave from 'arweave/node/common';
import deepHash from 'arweave/node/lib/deepHash';

const jwk: any = { n: 'foobor' }

const deps = {
  utils: Arweave.utils,
  crypto: Arweave.crypto,
  deepHash: deepHash,
}

const Data = ArDataApi(deps);

async function x() {
  const data = await create(deps, { data: 'foo' }, jwk);

  const r = await Data.decodeData(data, { string: true });
}
