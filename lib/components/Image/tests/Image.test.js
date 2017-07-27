'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Dimensions', function () {
  test('Render width/height props', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { width: '200', height: '100', src: 'mugatu.jpg' }));

    expect(wrapper.prop('width')).toBe('200');
    expect(wrapper.prop('height')).toBe('100');
  });

  test('<img> should not render width/height props if not defined', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { src: 'mugatu.jpg' }));

    expect(wrapper.prop('width')).toBeFalsy();
    expect(wrapper.prop('height')).toBeFalsy();
  });
});

describe('Titles', function () {
  test('Render alt prop', function () {
    var o = 'Mugatu';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { alt: o, src: 'mugatu.jpg' }));

    expect(wrapper.prop('alt')).toBe(o);
  });

  test('Render title prop', function () {
    var o = 'Mugatu';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { title: o, src: 'mugatu.jpg' }));

    expect(wrapper.prop('title')).toBe(o);
  });
});

describe('ClassNames', function () {
  test('Accept classNames', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { src: 'mugatu.jpg', className: 'so hot right now' }));

    var classNames = wrapper.prop('className');

    expect(classNames).toContain('c-Image');
    expect(classNames).toContain('so');
    expect(classNames).toContain('hot');
    expect(classNames).toContain('right');
    expect(classNames).toContain('now');
  });
});