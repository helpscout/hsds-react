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

    expect(wrapper.prop('className')).toContain('c-Scrollable');
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
      _react2.default.createElement(
        'div',
        { className: 'brick' },
        'BRICK'
      )
    ));
    var brick = wrapper.find('div.brick');

    expect(brick.exists()).toBeTruthy();
    expect(brick.text()).toBe('BRICK');
  });
});

describe('Fade', function () {
  test('Renders fade when specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { fade: true }));
    var fade = wrapper.find('.c-Scrollable__fade');

    expect(wrapper.prop('className')).toContain('has-fade');
    expect(fade.exists()).toBeTruthy();
  });
});

describe('Styles', function () {
  test('Applies rounded styles when specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { fade: true, rounded: true }));

    expect(wrapper.prop('className')).toContain('is-rounded');
  });
});