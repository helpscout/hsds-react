'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassName', function () {
  test('Applies custom className if specified', function () {
    var customClass = 'piano-key-neck-tie';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: customClass }));

    expect(wrapper.prop('className')).toContain(customClass);
  });
});

test('Renders 3 dots', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

  expect(wrapper.children().length).toBe(3);
});