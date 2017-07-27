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
  className: _propTypes2.default.string,
  disableSelect: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  faint: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  size: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  subtle: _propTypes2.default.bool,
  success: _propTypes2.default.bool,
  truncate: _propTypes2.default.bool,
  warning: _propTypes2.default.bool
}
var defaultProps = {
  className: '',
  disableSelect: false,
  error: false,
  faint: false,
  muted: false,
  subtle: false,
  success: false,
  size: false,
  truncate: false,
  warning: false
}

var Text = function Text (props) {
  var disableSelect = props.disableSelect,
    error = props.error,
    faint = props.faint,
    muted = props.muted,
    size = props.size,
    subtle = props.subtle,
    success = props.success,
    truncate = props.truncate,
    warning = props.warning

  var className = (0, _classNames2.default)('c-Text', disableSelect && 'is-disable-select', error && 'is-error', faint && 'is-faint', muted && 'is-muted', size && 'is-' + size, subtle && 'is-subtle', success && 'is-success', truncate && 'is-truncate', warning && 'is-warning', props.className)

  return _react2.default.createElement(
    'span',
    { className: className },
    props.children
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

exports.default = Text
