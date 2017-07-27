'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nameToInitials = exports.nameToInitials = function nameToInitials() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!name || !name.length) return '';

  var words = name.split(' ').map(function (w) {
    return w[0];
  }).map(function (w) {
    return w.toUpperCase();
  });

  return words.length === 1 ? words[0] : words[0] + words[words.length - 1];
};