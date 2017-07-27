'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
var nameToInitials = exports.nameToInitials = function nameToInitials () {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''

  return name.replace(/\W*(\w)\w*/g, '$1').toUpperCase()
}
