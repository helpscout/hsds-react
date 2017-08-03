'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _other = require('../../utilities/other');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  accessibilityLabel: _propTypes2.default.string,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  plain: _propTypes2.default.bool,
  primary: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  submit: _propTypes2.default.bool
};
var defaultProps = {
  accessibilityLabel: '',
  disabled: false,
  onBlur: _other.noop,
  onClick: _other.noop,
  onFocus: _other.noop,
  plain: false,
  primary: false,
  size: '',
  state: '',
  submit: false
};

var Button = function Button(props) {
  var accessibilityLabel = props.accessibilityLabel,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      onBlur = props.onBlur,
      onClick = props.onClick,
      onFocus = props.onFocus,
      plain = props.plain,
      primary = props.primary,
      size = props.size,
      state = props.state,
      submit = props.submit,
      rest = _objectWithoutProperties(props, ['accessibilityLabel', 'children', 'className', 'disabled', 'onBlur', 'onClick', 'onFocus', 'plain', 'primary', 'size', 'state', 'submit']);

  var buttonClassName = (0, _classNames2.default)('c-Button', size && 'c-Button--' + size, state && 'is-' + state, plain && 'c-Button--link', primary && 'c-Button--primary', props.className);

  var type = submit ? 'submit' : 'button';

  return _react2.default.createElement(
    'button',
    _extends({
      'aria-label': accessibilityLabel,
      className: buttonClassName,
      disabled: disabled,
      onBlur: onBlur,
      onClick: onClick,
      onFocus: onFocus,
      type: type
    }, rest),
    children
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

exports.default = Button;