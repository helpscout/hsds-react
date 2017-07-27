'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accessibility', function () {
  test('Has aria-role', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('role')).toBe('dialog');
  });
});

describe('ClassName', function () {
  test('Has default className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('className')).toBe('c-Overlay');
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

    var innerOverlay = wrapper.childAt(0);

    expect(innerOverlay.exists()).toBeTruthy();
    expect(innerOverlay.prop('className')).toContain('mind');
    expect(innerOverlay.text()).toBe('Megamind');
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

describe('Styles', function () {
  test('Renders inline-styles, if specified', function () {
    var styles = {
      background: 'blue'
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { styles: styles }));

    expect(wrapper.prop('styles')).toBe(styles);
  });
});