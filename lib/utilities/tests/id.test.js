'use strict';

var _id = require('../id');

describe('createUniqueIDFactory', function () {
  test('Generates an numerical ID (string), without arguments', function () {
    var uid = (0, _id.createUniqueIDFactory)();

    expect(uid()).toBe('1');
  });

  test('Generates an ID num with prefix', function () {
    var uid = (0, _id.createUniqueIDFactory)('prefix');

    expect(uid()).toBe('prefix1');
  });

  test('Auto-increments ID num on every call', function () {
    var uid = (0, _id.createUniqueIDFactory)('prefix');
    uid(); // 1
    uid(); // 2
    uid(); // 3
    uid(); // 4
    // Next call should be 5
    expect(uid()).toBe('prefix5');
  });
});