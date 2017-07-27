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

    expect(wrapper.prop('className')).toContain('c-Link');
  });

  test('Applies custom className if specified', function () {
    var className = 'gator';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: className }));

    expect(wrapper.prop('className')).toContain(className);
  });
});

describe('Click', function () {
  test('Can trigger onClick callback', function () {
    var value = false;
    var onClick = function onClick() {
      value = true;
    };
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { onClick: onClick }));

    wrapper.simulate('click');

    expect(value).toBeTruthy();
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

describe('Href', function () {
  test('Has an href of # by default', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      'Gator'
    ));

    expect(wrapper.prop('href')).toBe('#');
  });

  test('Can set link href, if specified', function () {
    var url = 'https://www.helpscout.net';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { href: url },
      'Gator'
    ));

    expect(wrapper.prop('href')).toBe(url);
  });
});

describe('External', function () {
  test('Adds external <a> attributes if external is specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { external: true },
      'Link'
    ));

    expect(wrapper.prop('target')).toBe('_blank');
    expect(wrapper.prop('rel')).toContain('noopener noreferrer');
  });
});