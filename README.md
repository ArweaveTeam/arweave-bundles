# Arweave-Data (ANS-102)

This library contains routines to create, read, and verify Arweave bundled data.

This is the recommended way to write data to the Arweave network, as it provides a number of advantages over writing data over using regular transactions. See [ANS-102](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md) for more details.

This is a self-contained library, so, we need to initialize the API with a couple of dependencies

```javascript

import Arweave from 'arweave/node'
import deepHash from 'arweave/common/lib/deepHash'
import { ArDataApi } from 'arweave-data'

const deps = {
  utils: Arweave.utils,
  crypto: Arweave.crypto,
  deepHash: deepHash,
}

const ArData = ArDataApi(deps);

async function makeSomeDataItems() {
  
  const myTags = [
    { name: 'App-Name', value: 'myApp' },
    { name: 'App-Version', value: '1.0.0' }
  ]

  let data = await ArData.createData({ to: 'awalleet', data: 'somemessage', tags: myTags }, jwk);
  
  // Add some more tags after creation.
  ArData.addTag(data, 'MyTag', 'value1')
  ArData.addTag(data, 'MyTag', 'value2')

  // Sign the data, ready to be added to a bundle
  let data = await ArData.sign(data, jwk);
  
  let verified = await ArData.verify(data);
  // verified = true

  // Cant modifiy it anymore or the signature will become invalid.  
  ArData.addTag(data, 'AnotherTag', 'value2');

  verified = await ArData.verify(signed)
  // verified = false
}
```
