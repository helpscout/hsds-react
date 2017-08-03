'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniqueIDFactory = createUniqueIDFactory;
// Source
// https://github.com/Shopify/javascript-utilities/blob/master/src/other.ts
function createUniqueIDFactory() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var index = 1;
  return function () {
    return '' + prefix + index++;
  };
}