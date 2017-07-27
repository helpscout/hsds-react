'use strict';

var _strings = require('../strings');

describe('nameToInitials', function () {
  test('Returns empty string if no args are passed', function () {
    expect((0, _strings.nameToInitials)()).toBe('');
  });
});