'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _rgbHex = require('rgb-hex');

var _rgbHex2 = _interopRequireDefault(_rgbHex);

var _Input = require('../../../components/Input');

var _Input2 = _interopRequireDefault(_Input);

var _barista = require('../helpers/barista');

var _barista2 = _interopRequireDefault(_barista);

var _colors = require('../helpers/colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _barista2.default)('\n  @import "src/styles/components/Input/_index";\n');

describe('Base', function () {
  test('Simulates an input style', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, null)).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('background-color')).toBe('white');
    expect(o.prop('border')).toContain('1px solid');
    expect(o.prop('border-radius')).toBe('4px');
  });

  test('Absolulely positioned to parent', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, null)).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('position')).toBe('absolute');
    expect(o.prop('top')).toBe('0px');
    expect(o.prop('right')).toBe('0px');
    expect(o.prop('bottom')).toBe('0px');
    expect(o.prop('left')).toBe('0px');
  });
});

describe('Styles', function () {
  test('Removes borders if seamless', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { seamless: true })).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('border-color')).toBe('transparent');
  });

  test('Absolutely positioned to parent', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, null)).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('position')).toBe('absolute');
    expect(o.prop('top')).toBe('0px');
    expect(o.prop('right')).toBe('0px');
    expect(o.prop('bottom')).toBe('0px');
    expect(o.prop('left')).toBe('0px');
  });
});

describe('States', function () {
  test('Applies error styles if defined', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { state: 'error' })).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('border-color')).toBe(_colors2.default.red['500']);
  });

  test('Applies success styles if defined', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { state: 'success' })).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('border-color')).toBe(_colors2.default.green['500']);
  });

  test('Applies warning styles if defined', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { state: 'warning' })).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');

    expect(o.prop('border-color')).toBe(_colors2.default.yellow['500']);
  });

  test('Applies disabled styles if defined', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { disabled: true })).html();
    styles.html(markup);

    var o = styles.$('.c-InputBackdrop');
    var color = '#' + (0, _rgbHex2.default)(o.prop('background-color'));

    expect(color).toContain(_colors2.default.grey['200']);
  });
});