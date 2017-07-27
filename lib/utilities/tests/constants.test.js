'use strict';

var _constants = require('../constants');

describe('noop', function () {
  test('Does nothing', function () {
    expect((0, _constants.noop)()).toBe(undefined);
  });
});