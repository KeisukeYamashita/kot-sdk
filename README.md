# King of Time (KOT) SDK

> Unofficial Node.js API client for [King of Time](https://www.kingtime.jp/) Web API.

You can find the official web api spec [here](https://developer.kingtime.jp/).

## Install

You can install this SDK by `npm`:

```console
$ npm install kot-sdk
```

or by `yarn`:

```console
$ yarn add kot-sdk
```

## Basic Usage

```typescript
import Kot from 'kot-sdk'

const client = new Kot({token: 'YOUR_ACCESS_TOKEN'})

(async () => {
    const employee = await client.employee.get(100)
})()
```

## Author

* [KeisukeYamashita](https://github.com/KeisukeYamashita)

## License

`kot-sdk` is released under the BSD 3-Clause License. See details [LICENSE](./LICENSE).
