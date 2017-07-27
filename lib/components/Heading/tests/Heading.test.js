'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassName', function () {
  test('Has default component className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('className')).toContain('c-Heading');
  });

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

describe('Selector', function () {
  test('Renders a div selector by default', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.node.type).toBe('div');
  });

  test('Renders a custom selector, if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { selector: 'span' }));

    expect(wrapper.node.type).toBe('span');
  });
});

describe('Styles', function () {
  test('Applies sizing styles if specified', function () {
    var wrapper1 = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: 'h1' }));
    var wrapperSm = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: 'small' }));

    expect(wrapper1.prop('className')).toContain('is-h1');
    expect(wrapperSm.prop('className')).toContain('is-small');
  });

  test('Applies disableSelect styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { disableSelect: true }));

    expect(wrapper.prop('className')).toContain('is-disableSelect');
  });

  test('Applies light styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { light: true }));

    expect(wrapper.prop('className')).toContain('is-light');
  });
});