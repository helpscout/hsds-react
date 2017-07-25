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

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  hover: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  onFocus: _propTypes2.default.func,
  seamless: _propTypes2.default.bool,
  selector: _propTypes2.default.string
};
var defaultProps = {
  className: '',
  hover: false,
  href: '',
  onBlur: _constants.noop,
  onClick: false,
  onFocus: _constants.noop,
  seamless: false,
  selector: 'div'
};

var Card = function Card(props) {
  var hover = props.hover,
      href = props.href,
      onClick = props.onClick,
      seamless = props.seamless,
      selector = props.selector;


  var className = (0, _classNames2.default)('c-Card', (onClick || href) && 'c-Card--clickable', (onClick || hover || href) && 'c-Card--hover', seamless && 'c-Card--seamless', props.className);

  var selectorTag = href ? 'a' : selector;

  var element = _react2.default.createElement(selectorTag, _extends({}, props, {
    className: className
  }), props.children);

  return element;
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

exports.default = Card;