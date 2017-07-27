'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _classNames = require('../../utilities/classNames')

var _classNames2 = _interopRequireDefault(_classNames)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

var propTypes = {
  className: _propTypes2.default.string
}
var defaultProps = {
  className: ''
}

var LoadingDots = function LoadingDots (props) {
  var className = (0, _classNames2.default)('c-LoadingDots', props.className)

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement('div', { className: 'c-LoadingDots__dot c-LoadingDots__dot--one' }),
    _react2.default.createElement('div', { className: 'c-LoadingDots__dot c-LoadingDots__dot--two' }),
    _react2.default.createElement('div', { className: 'c-LoadingDots__dot c-LoadingDots__dot--three' })
  )
}

LoadingDots.propTypes = propTypes
LoadingDots.defaultProps = defaultProps

exports.default = LoadingDots
