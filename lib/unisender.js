'use strict';

const Unisender = require('@wmakeev/unisender');

class UnisenderModule {
  constructor(sb) {
    this.sb = sb;
  }

  init(options) {
    this.options = options;
    this.api = new Unisender({ api_key: options.apiKey });['callMethod', 'sendSms'].forEach(method => {
      this.sb.on(method, this[method].bind(this));
    });
  }

  destroy() {
    this.options = null;
    this.api = null;
  }

  callMethod(methodName, options) {
    return this.api[methodName](options).then(res => res.result);
  }

  sendSms(options) {
    return this.callMethod('sendSms', options);
  }
}

module.exports = UnisenderModule;