'use strict'

const { maybe } = require('maybes')
const Unisender = require('@wmakeev/unisender')
const errors = require('./errors')

class UnisenderModule {
  constructor (sb) {
    this.sb = sb
  }

  init (options) {
    this.options = options
    this.api = new Unisender({ api_key: options.apiKey })

    ;['callMethod', 'sendSms'].forEach(method => {
      this.sb.on(method, this[method].bind(this))
    })
  }

  destroy () {
    this.options = null
    this.api = null
  }

  callMethod (methodName, options) {
    return this.api[methodName](options)
      .then(response => response.result)
      .catch(response => {
        let error = maybe(response)
          .filter(res => res.code && res.error)
          .map(res => {
            if (errors[res.code]) {
              res.description = errors[res.code]
            } else {
              res.description = errors.unknown
            }
            return res
          })
          .map(res => {
            let err = new Error('Unisender: ' + res.description)
            err.code = res.code
            err.error = res
            return err
          })

        if (error.isJust()) {
          return Promise.reject(error.just())
        } else {
          error = new Error('Unisender: неизвестная ошибка')
          error.error = response
          return Promise.reject(error)
        }
      })
  }

  sendSms (options) {
    return this.callMethod('sendSms', options)
  }
}

module.exports = UnisenderModule
