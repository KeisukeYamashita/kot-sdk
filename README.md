# King of Time (KOT) SDK

[![](https://img.shields.io/badge/-Javascript-F7DF1E?style=flat-square&logoColor=white&logo=javascript)](https://github.com/KeisukeYamashita/kot-sdk)
[![](https://img.shields.io/badge/-Typescript-007ACC?style=flat-square&logoColor=white&logo=typescript)](https://github.com/KeisukeYamashita/kot-sdk)
[![npm version](https://badge.fury.io/js/kot-sdk.svg)](https://badge.fury.io/js/kot-sdk)
![Test](https://github.com/KeisukeYamashita/kot-sdk/workflows/Test/badge.svg)
![Publish](https://github.com/KeisukeYamashita/kot-sdk/workflows/Publish/badge.svg)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![codecov](https://codecov.io/gh/KeisukeYamashita/kot-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/KeisukeYamashita/kot-sdk)

> Unofficial Node.js API client for [King of Time](https://www.kingtime.jp/) Web API.

You can find the official web api spec [here](https://developer.kingtime.jp/).

## Supported Features

These are the list of supported features.

* [ ] Token service
* [ ] Company
* [ ] Admin
* [ ] Employee
    * [x] Get
    * [x] List
* [ ] Working
    * [ ] Daily
        * [ ] Record 
            * [x] Post record
        * [ ] Schedule
    * [ ] Monthly
        * [ ] Record
        * [ ] Schedule
    * [ ] Yearly

Please help me!

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
    const employee = await client.employee.get({employeeCode: 100})
})()
```

## Author

* [KeisukeYamashita](https://github.com/KeisukeYamashita)

## License

`kot-sdk` is released under the BSD 3-Clause License. See details [LICENSE](./LICENSE).
