'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _other = require('../../utilities/other');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};
var defaultProps = {
  onClick: _other.noop,
  style: {}
};

var Overlay = function Overlay(props) {
  var onClick = props.onClick,
      style = props.style;


  var className = (0, _classNames2.default)('c-Overlay', props.className);

  return _react2.default.createElement(
    'div',
    { className: className, style: style, role: 'dialog', onClick: onClick },
    props.children
  );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

exports.default = Overlay;