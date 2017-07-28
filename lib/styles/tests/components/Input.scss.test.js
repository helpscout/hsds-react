'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Input = require('../../../components/Input');

var _Input2 = _interopRequireDefault(_Input);

var _barista = require('../helpers/barista');

var _barista2 = _interopRequireDefault(_barista);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _barista2.default)('\n  @import "src/styles/components/Input/_index";\n');

describe('Input', function () {
  test('Should be display flex', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, null)).html();
    styles.html(markup);

    var o = styles.$('.c-Input');

    expect(o.prop('align-items')).toBe('center');
    expect(o.prop('display')).toBe('flex');
  });
});

describe('Prefix/Suffix', function () {
  test('Should be dimmed by default', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { prefix: 'Prefix' })).html();
    styles.html(markup);

    var o = styles.$('.c-Input__prefix');

    expect(o.prop('opacity')).not.toBe('1');
  });

  test('Should be full opacity if input has value', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { prefix: 'Prefix', value: 'Value' })).html();
    styles.html(markup);

    var o = styles.$('.c-Input__prefix');

    expect(o.prop('opacity')).toBe('1');
  });

  test('Should prevent text-wrapping', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { prefix: 'Prefix' })).html();
    styles.html(markup);

    var o = styles.$('.c-Input__prefix');

    expect(o.prop('white-space')).toBe('nowrap');
  });
});

describe('Multiline', function () {
  test('Should not be resizable by default', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { multiline: true })).html();
    styles.html(markup);

    var o = styles.$('.c-InputField');

    expect(o.prop('resize')).toBe('none');
    expect(o.prop('overflow')).toBe('hidden');
  });

  test('Applies resizable styles if set', function () {
    var markup = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, { multiline: true, resizable: true })).html();
    styles.html(markup);

    var o = styles.$('.c-InputField');

    expect(o.prop('resize')).toBe('vertical');
  });
});