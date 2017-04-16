'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const test = require('blue-tape');
const sinon = require('sinon');
const nock = require('nock');
const moduleUnisender = require('..');

test('moduleUnisender', t => {
  t.equal(typeof moduleUnisender, 'function', 'should be function');
  t.end();
});

test('moduleUnisender instance', (() => {
  var _ref = _asyncToGenerator(function* (t) {
    let handlers = {};
    let sb = {
      on: sinon.spy(function (ev, handler) {
        handlers[ev] = handler;
      })
    };

    let instance = moduleUnisender(sb);

    t.equal(typeof instance, 'object', 'should be object');
    t.ok(instance.init, 'should have init method');
    t.equal(Object.keys(handlers).length, 0, 'should not register handlers');

    instance.init({ apiKey: 'some-key' });
    t.equal(sb.on.callCount, 2);
    t.deepEqual(Object.keys(handlers), ['callMethod', 'sendSms'], 'should register handlers');

    // nock.recorder.rec({
    //   output_objects: false
    // })

    let scope = nock('https://api.unisender.com:443', { 'encodedQueryParams': true }).post('/en/api/sendSms', 'phone=79226090705&sender=TEST&text=SMS%20text&api_key=some-key').query({ 'format': 'json' }).reply(200, {
      'result': {
        'sms_id': 14425539,
        'phone': '79226090705',
        'price': 0.0289,
        'currency': 'USD'
      }
    }, ['Content-Type', 'application/json; charset=utf-8', 'Transfer-Encoding', 'chunked', 'Connection', 'close', 'Pragma', 'no-cache', 'Access-Control-Allow-Origin', '*']);

    let result = yield handlers.sendSms({
      phone: '79226090705',
      sender: 'TEST',
      text: 'SMS text'
    });

    scope.done();
    t.deepEqual(result, { currency: 'USD', phone: '79226090705', price: 0.0289, sms_id: 14425539 }, 'should return result');

    // TODO Test error
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());