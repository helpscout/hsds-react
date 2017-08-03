'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _other = require('../../utilities/other');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  title: _propTypes2.default.string
};

var defaultProps = {
  onBlur: _other.noop,
  onClick: _other.noop,
  onFocus: _other.noop,
  title: 'Close'
};

var CloseButton = function CloseButton(props) {
  var className = props.className,
      title = props.title,
      rest = _objectWithoutProperties(props, ['className', 'title']);

  var buttonClassName = (0, _classNames2.default)('c-CloseButton', className);

  return _react2.default.createElement(
    'button',
    _extends({ className: buttonClassName }, rest, { 'aria-label': 'Close', title: title }),
    _react2.default.createElement(_Icon2.default, {
      center: true,
      className: 'c-CloseButton__icon',
      ignoreClick: true,
      muted: true,
      name: 'cross-medium',
      title: 'Close'
    })
  );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

exports.default = CloseButton;