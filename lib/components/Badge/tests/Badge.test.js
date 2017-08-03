'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statusTestHelper = function statusTestHelper(status) {
  test('Applies ' + status + ' styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { status: status },
      'Zoolander'
    ));

    expect(wrapper.prop('className')).toContain('is-' + status);
  });
};

describe('ClassName', function () {
  test('Has default className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('className')).toBe('c-Badge');
  });

  test('Accepts custom className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'zoolander' }));

    expect(wrapper.prop('className')).toContain('zoolander');
  });
});

describe('Content', function () {
  test('Renders child content', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      'Zoolander'
    ));

    expect(wrapper.text()).toBe('Zoolander');
  });
});

describe('Styles', function () {
  test('Applies style className if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { white: true },
      'Zoolander'
    ));

    expect(wrapper.prop('className')).toContain('is-white');
  });
});

describe('Sizes', function () {
  test('Applies size styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { size: 'sm' },
      'Zoolander'
    ));

    expect(wrapper.prop('className')).toContain('is-sm');
  });
});

describe('Status', function () {
  var status = ['error', 'info', 'success', 'warning'];

  status.forEach(function (s) {
    return statusTestHelper(s);
  });
});