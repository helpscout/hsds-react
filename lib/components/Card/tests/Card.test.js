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

    expect(wrapper.prop('className')).toBe('c-Card');
  });

  test('Accepts custom className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'not-metro-man' }));

    expect(wrapper.prop('className')).toContain('not-metro-man');
  });
});

describe('Content', function () {
  test('Renders child content', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      'Megamind'
    ));

    expect(wrapper.text()).toBe('Megamind');
  });

  test('Render child components', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { className: 'mega' },
      _react2.default.createElement(
        _2.default,
        { className: 'mind' },
        'Megamind'
      )
    ));

    var innerCard = wrapper.childAt(0);

    expect(innerCard.exists()).toBeTruthy();
    expect(innerCard.prop('className')).toContain('mind');
    expect(innerCard.text()).toBe('Megamind');
  });
});

describe('Link', function () {
  var link = 'https://www.helpscout.net';

  test('Renders an `a` selector if href is specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { href: link }));

    expect(wrapper.node.type).toBe('a');
    expect(wrapper.prop('href')).toBe(link);
  });

  test('Adds link styles if href is specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { href: link }));

    expect(wrapper.prop('className')).toContain('is-clickable');
    expect(wrapper.prop('className')).toContain('is-hoverable');
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

  test('Adds clickable styles if onClick is specified', function () {
    var noop = function noop() {};
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { onClick: noop }));

    expect(wrapper.prop('className')).toContain('is-clickable');
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
  test('Renders seamless styles, if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { seamless: true }));

    expect(wrapper.prop('className')).toContain('is-seamless');
  });
});