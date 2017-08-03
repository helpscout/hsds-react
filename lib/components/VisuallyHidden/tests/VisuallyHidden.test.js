'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassName', function () {
  test('Has default className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('className')).toContain('c-VisuallyHidden');
  });

  test('Applies custom className if specified', function () {
    var customClass = 'piano-key-neck-tie';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: customClass }));

    expect(wrapper.prop('className')).toContain(customClass);
  });
});

describe('Content', function () {
  test('Renders child text', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      'Foamy White Latte'
    ));

    expect(wrapper.text()).toBe('Foamy White Latte');
  });

  test('Renders child component', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(
        'div',
        null,
        'Foamy White Latte'
      )
    ));
    var o = wrapper.find('div');

    expect(o.text()).toBe('Foamy White Latte');
  });
});

describe('States', function () {
  test('Adds focusable styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { focusable: true }));

    expect(wrapper.prop('className')).toContain('is-focusable');
    expect(wrapper.prop('tabIndex')).toBe(1);
  });
});