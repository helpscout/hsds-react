'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Resizer = require('../Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('onResize', function () {
  test('Is called when mounted', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_Resizer2.default, { onResize: spy }));

    expect(spy).toHaveBeenCalled();
  });
});

describe('ReplaceEntity', function () {
  test('Converts greater/less than characters', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Resizer2.default, { contents: '<strong>News team!</strong>' }));
    var o = wrapper.find('.c-InputGhost').first();
    var html = o.html().replace('<div class="c-InputGhost">', '').replace('</div>', '');

    expect(html).not.toContain('<strong>');
    expect(html).toContain('&lt;');
    expect(html).toContain('&gt;');
    expect(html).toContain('&lt;strong&gt;');
  });

  test('Converts \\n characters to <br>', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Resizer2.default, { contents: '\nSan Diego\n' }));
    var o = wrapper.find('.c-InputGhost').first();
    var html = o.html().replace('<div class="c-InputGhost">', '').replace('</div>', '');

    expect(html).not.toContain('\n');
    expect(html).toContain('<br>San Diego<br>');
  });

  test('Converts & characters to &amp;', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Resizer2.default, { contents: 'San & Diego' }));
    var o = wrapper.find('.c-InputGhost').first();
    var html = o.html().replace('<div class="c-InputGhost">', '').replace('</div>', '').replace('<br>', '');

    expect(html).toBe('San &amp; Diego');
  });

  test('Does not convert if content does not contain special characters', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Resizer2.default, { contents: 'San Diego' }));
    var o = wrapper.find('.c-InputGhost').first();
    var html = o.html().replace('<div class="c-InputGhost">', '').replace('</div>', '').replace('<br>', '');

    expect(html).toBe('San Diego');
  });
});

describe('InputGhost', function () {
  test('Renders an InputGhost', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Resizer2.default, null));
    var o = wrapper.find('.c-InputGhost');

    expect(o.exists()).toBeTruthy();
    expect(o.last().html()).toContain('<br>');
  });

  test('Adds a <br> for every line', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Resizer2.default, { minimumLines: 5 }));
    var o = wrapper.find('.c-InputGhost');

    expect(o.last().html()).toContain('<br><br><br><br><br>');
  });

  test('Does not render content InputGhost if minimumLines is falsey', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Resizer2.default, { minimumLines: 0 }));
    var o = wrapper.find('.c-InputGhost');

    expect(o.length).toBe(1);
  });
});