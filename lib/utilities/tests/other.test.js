'use strict';

var _other = require('../other');

describe('noop', function () {
  test('Does nothing', function () {
    expect((0, _other.noop)()).toBe(undefined);
  });
});