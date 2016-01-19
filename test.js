'use strict';

require('mocha');
var assert = require('assert');
var list = require('./');

describe('helper-list', function() {
  it('should export a function', function() {
    assert.equal(typeof list, 'function');
  });

  it('should create a list string from an array', function() {
    assert.equal(list(['a', 'b', 'c']), '- a\n- b\n- c\n');
  });

  it('should detect levels from an array of strings', function() {
    assert.equal(list(['a', ' b', 'c']), '- a\n  * b\n- c\n');
    assert.equal(list(['a', '  b', 'c']), '- a\n  * b\n- c\n');
    assert.equal(list(['  a', '  b', 'c']), '  * a\n  * b\n- c\n');
  });

  it('should reformat a list string', function() {
    assert.equal(list('a\nb\nc'), '- a\n- b\n- c\n');
    assert.equal(list('*a\n*b\n*c'), '- a\n- b\n- c\n');
    assert.equal(list('a\nb\n- c'), '- a\n- b\n- c\n');
  });

  it('should detect levels from a string', function() {
    assert.equal(list('a\nb\n - c'), '- a\n- b\n  * c\n');
    assert.equal(list('*a\n*b\n *c'), '- a\n- b\n  * c\n');
    assert.equal(list(' *a\n *b\n *c'), '  * a\n  * b\n  * c\n');
    assert.equal(list(' *a\n   *b\n     *c'), '  * a\n    + b\n      - c\n');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      list();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected list to be an array or string');
      cb();
    }
  });
});
