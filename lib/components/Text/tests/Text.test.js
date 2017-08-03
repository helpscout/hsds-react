'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassName', function () {
  test('Applies custom className if specified', function () {
    var className = 'gator';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: className }));

    expect(wrapper.prop('className')).toContain(className);
  });
});

describe('Content', function () {
  test('Renders child content', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      'Gator'
    ));

    expect(wrapper.text()).toBe('Gator');
  });
});

describe('Styles', function () {
  test('Has default component className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('className')).toContain('c-Text');
  });

  test('Applies sizing styles if specified', function () {
    var wrapper13 = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: '13' }));
    var wrapper18 = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: '18' }));

    expect(wrapper13.prop('className')).toContain('is-13');
    expect(wrapper18.prop('className')).toContain('is-18');
  });

  test('Applies disableSelect styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { disableSelect: true }));

    expect(wrapper.prop('className')).toContain('is-disableSelect');
  });

  test('Applies muted styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { muted: true }));

    expect(wrapper.prop('className')).toContain('is-muted');
  });

  test('Applies subtle styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { subtle: true }));

    expect(wrapper.prop('className')).toContain('is-subtle');
  });

  test('Applies faint styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { faint: true }));

    expect(wrapper.prop('className')).toContain('is-faint');
  });

  test('Applies truncation styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { truncate: true }));

    expect(wrapper.prop('className')).toContain('is-truncate');
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