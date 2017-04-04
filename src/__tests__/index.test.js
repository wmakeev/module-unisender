'use strict'

const test = require('blue-tape')
const sinon = require('sinon')
const nock = require('nock')
const moduleUnisender = require('..')

test('moduleUnisender', t => {
  t.equal(typeof moduleUnisender, 'function', 'should be function')
  t.end()
})

test('moduleUnisender instance', async t => {
  let callMethodHandler
  let sb = {
    on: sinon.spy(function (ev, handler) {
      if (ev === 'callMethod') callMethodHandler = handler
    })
  }

  let instance = moduleUnisender(sb)

  t.equal(typeof instance, 'object', 'should be object')
  t.ok(instance.init, 'should have init method')
  t.notOk(callMethodHandler)

  instance.init({ apiKey: 'some-key' })
  t.ok(sb.on.calledOnce)
  t.equal(typeof callMethodHandler, 'function', 'should add `callMethod` event handler')

  // nock.recorder.rec({
  //   output_objects: false
  // })

  let scope = nock('https://api.unisender.com:443', { 'encodedQueryParams': true })
    .post('/en/api/sendSms', 'phone=79226090705&sender=TEST&text=SMS%20text&api_key=some-key')
    .query({ 'format': 'json' })
    .reply(200, {
      'result': {
        'sms_id': 14425539,
        'phone': '79226090705',
        'price': 0.0289,
        'currency': 'USD'
      }
    },
    [
      'Content-Type',
      'application/json; charset=utf-8',
      'Transfer-Encoding',
      'chunked',
      'Connection',
      'close',
      'Pragma',
      'no-cache',
      'Access-Control-Allow-Origin',
      '*'
    ])

  let result = await callMethodHandler('sendSms', {
    phone: '79226090705',
    sender: 'TEST',
    text: 'SMS text'
  })

  scope.done()
  t.deepEqual(result, { currency: 'USD', phone: '79226090705', price: 0.0289, sms_id: 14425539 },
    'should return result')

  // TODO Test error
})
