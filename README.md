module-unisender
================

[![module specification](https://img.shields.io/badge/module_specification-1.0-blue.svg?style=flat-square)](https://github.com/wmakeev/module-specification)
[![npm](https://img.shields.io/npm/v/@wmakeev/module-unisender.svg?maxAge=1800&style=flat-square)](https://www.npmjs.com/package/@wmakeev/module-unisender)
[![Travis](https://img.shields.io/travis/wmakeev/module-unisender.svg?maxAge=1800&style=flat-square)](https://travis-ci.org/wmakeev/module-unisender)
[![Coveralls](https://img.shields.io/coveralls/wmakeev/module-unisender.svg?maxAge=1800&style=flat-square)](https://coveralls.io/github/wmakeev/module-unisender)
[![bitHound Dependencies](https://img.shields.io/bithound/dependencies/github/wmakeev/module-unisender.svg?maxAge=1800&style=flat-square)](https://www.bithound.io/github/wmakeev/module-unisender/master/dependencies/npm)
[![bitHound DevDependencies](https://img.shields.io/bithound/devDependencies/github/wmakeev/module-unisender.svg?maxAge=1800&style=flat-square)](https://www.bithound.io/github/wmakeev/module-unisender/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/code/github/wmakeev/module-unisender.svg?maxAge=1800&style=flat-square)](https://www.bithound.io/github/wmakeev/module-unisender)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> Unisender module.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

## Installation

```
$ npm i @wmakeev/module-unisender
```

## Usage

```js
let UnisenderModule = require('@wmakeev/module-unisender')

let instance = UnisenderModule(someSandbox)

instance.init({ apiKey: 'you_api_key' })

let result = await instance.sendSms({
  phone: '79226090705',
  sender: 'TEST',
  text: 'SMS text'
})

assert.deepEqual(result, {
  currency: 'USD',
  phone: '79226090705',
  price: 0.0289,
  sms_id: 14425539
})
```

## API

### instance.init(): void

### instance.destroy(): void

### instance.callMethod(method: string, options: object): Promise<object>

### instance.sendSms(options: object): Promise<object>

Alias to `sendSms` method call

## License

[ISC © Vitaliy V. Makeev](../LICENSE)
