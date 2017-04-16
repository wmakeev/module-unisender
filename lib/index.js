/*
 * module-unisender
 *
 * Copyright (c) 2017, Vitaliy V. Makeev
 * Licensed under ISC.
 */

'use strict';

var UnisenderModule = require('./unisender');

module.exports = function (sb) {
  return new UnisenderModule(sb);
};