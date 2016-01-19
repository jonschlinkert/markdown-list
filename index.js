/*!
 * markdown-list <https://github.com/jonschlinkert/markdown-list>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var expand = require('expand-range');
var isEven = require('is-even');
var bullet = require('bullets');
var toList = require('to-list');

module.exports = function createList(list, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  options = options || {};
  if (typeof list === 'string') {
    list = toList(list, fn);
  }

  if (!Array.isArray(list)) {
    throw new TypeError('expected list to be an array or string');
  }

  if (typeof list[0] === 'string') {
    list = list.reduce(function(acc, str) {
      return acc.concat(toList(str, fn));
    }, []);
  }

  list = list.map(function(item) {
    if (item.level > 0 && isEven(item.level)) {
      item.level = item.level / 2;
    }
    return item;
  });

  var isNumber = /\d/.test(String(list[0].lead));
  if (isNumber) {
    options.chars = expand('1..100');
  }

  return bullet(list, options, fn);
};
