# Arweave-Data (ANS-102)

This library contains routines to create, read, and verify Arweave bundled data.

This is the recommended way to write data to the Arweave network, as it provides a number of advantages over writing data over using regular transactions. See [ANS-102](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md) for more details.

This is a fully self-contained library. So all methods exposed in this library take a dependencies argument as their first value. This dependencies argument is methods that are available in arweave-js, or could be provided
otherwise.
