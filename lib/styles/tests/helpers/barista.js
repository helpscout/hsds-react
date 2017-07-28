'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seedBarista = require('seed-barista');

var _seedBarista2 = _interopRequireDefault(_seedBarista);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(content) {
  var b = (0, _seedBarista2.default)({ content: content }).mount();
  var css = b.css;

  b.dom.$('head').append('<style>' + css + '</style>');
  b.$ = b.dom.$;

  return b;
};

exports.default = styles;