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

    expect(wrapper.prop('className')).toBe('c-CardBlock');
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

    var innerCardBlock = wrapper.childAt(0);

    expect(innerCardBlock.exists()).toBeTruthy();
    expect(innerCardBlock.prop('className')).toContain('mind');
    expect(innerCardBlock.text()).toBe('Megamind');
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
  test('Does not have a size modifier style by default', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    var classNames = wrapper.prop('className');

    expect(classNames).not.toContain('c-CardBlock--sm');
    expect(classNames).not.toContain('c-CardBlock--md');
    expect(classNames).not.toContain('c-CardBlock--lg');
  });

  test('Renders size styles, if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: 'sm' }));

    expect(wrapper.prop('className')).toContain('c-CardBlock--sm');
  });
});