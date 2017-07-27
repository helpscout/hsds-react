'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classNames = function classNames() {
  for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  return classes.filter(function (name) {
    return name && typeof name !== 'boolean';
  }).join(' ');
};

exports.default = classNames;