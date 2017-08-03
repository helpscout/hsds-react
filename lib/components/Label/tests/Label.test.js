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

    expect(wrapper.prop('className')).toContain('c-Label');
  });

  test('Applies custom className if specified', function () {
    var className = 'channel-4';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: className }));

    expect(wrapper.prop('className')).toContain(className);
  });
});

describe('Content', function () {
  test('Renders child content', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      null,
      'Channel 4'
    ));
    var text = wrapper.find('Text');

    expect(text.exists()).toBeTruthy();
    expect(text.text()).toBe('Channel 4');
  });
});

describe('For', function () {
  test('Accepts for prop', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { 'for': 'channel' },
      'Channel 4'
    ));

    expect(wrapper.prop('for')).toBe('channel');
  });
});

describe('States', function () {
  test('Applies error styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { state: 'error' }));

    expect(wrapper.prop('className')).toContain('is-error');
  });

  test('Applies success styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { state: 'success' }));

    expect(wrapper.prop('className')).toContain('is-success');
  });

  test('Applies warning styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { state: 'warning' }));

    expect(wrapper.prop('className')).toContain('is-warning');
  });
});