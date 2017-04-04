/*
 * module-unisender
 *
 * Copyright (c) 2017, Vitaliy V. Makeev
 * Licensed under ISC.
 */

'use strict';

// const have = require('have2')

const Unisender = require('@wmakeev/unisender');

class UnisenderModule {
  constructor(sb) {
    this.sb = sb;
  }

  init(options) {
    this.options = options;
    this.api = new Unisender({ api_key: options.apiKey });
    this.sb.on('callMethod', this.callMethod.bind(this));
  }

  callMethod(methodName, options) {
    return this.api[methodName](options).then(res => res.result);
  }
}

module.exports = function (sb) {
  return new UnisenderModule(sb);
};