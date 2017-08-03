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

    expect(wrapper.prop('className')).toContain('c-CloseButton');
  });

  test('Applies custom className if specified', function () {
    var className = 'channel-4';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: className }));

    expect(wrapper.prop('className')).toContain(className);
  });
});

describe('Accessibility', function () {
  test('Has proper aria-role', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('aria-label')).toBe('Close');
  });

  test('Has default title', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));

    expect(wrapper.prop('title')).toBe('Close');
  });

  test('Can modify title', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { title: 'CLOSE DIS THING' }));

    expect(wrapper.prop('title')).toBe('CLOSE DIS THING');
  });
});

describe('Events', function () {
  test('Can trigger onBlur callback', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onBlur: spy }));

    wrapper.simulate('blur');

    expect(spy).toHaveBeenCalled();
  });

  test('Can trigger onClick callback', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onClick: spy }));

    wrapper.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  test('Can trigger onFocus callback', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onFocus: spy }));

    wrapper.simulate('focus');

    expect(spy).toHaveBeenCalled();
  });
});