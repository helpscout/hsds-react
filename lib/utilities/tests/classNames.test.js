'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _classNames = require('../classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Consolidate arguments into a single string, separated by spaces', function () {
  var o = (0, _classNames2.default)('a', 'b', 'c');

  expect(o).toBe('a b c');
});

test('Remove falsy arguments', function () {
  var falsy = 10 > 100;
  var o = (0, _classNames2.default)('a', 'b', 'c', falsy && 'd');

  expect(o).toBe('a b c');
});

test('Remove `true` from final output', function () {
  var o = (0, _classNames2.default)('a', 'b', true, 'c');

  expect(o).toBe('a b c');
});

test('Return a string, even if arguments are numbers', function () {
  var o = (0, _classNames2.default)(1, 2);

  expect(typeof o === 'undefined' ? 'undefined' : _typeof(o)).toBe('string');
  expect(o).toBe('1 2');
});

test('Returns empty string by default', function () {
  expect((0, _classNames2.default)('')).toBe('');
});