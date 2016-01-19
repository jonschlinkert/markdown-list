'use strict';

var list = require('./');

console.log(list('foo\nbar\nbaz'));
console.log(list('*foo\n*bar\n*baz'));
console.log(list(['foo', 'bar', 'baz']));

// multiple levels
console.log(list('*foo\n - bar\n *baz'));
console.log(list('*foo\n- bar'));
