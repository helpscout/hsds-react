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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  external: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  to: _propTypes2.default.string
};
var defaultProps = {
  className: '',
  external: false,
  href: '#',
  onBlur: _constants.noop,
  onClick: _constants.noop,
  onFocus: _constants.noop,
  to: ''
};

var Link = function Link(props) {
  var className = props.className,
      external = props.external,
      rest = _objectWithoutProperties(props, ['className', 'external']);

  var linkClassName = (0, _classNames2.default)('c-Link', className);

  var target = external ? '_blank' : undefined;
  var rel = external ? 'noopener noreferrer' : undefined;

  // Note: If we're going to support React Router, then the `to` prop
  // should render React Router's <Link> component.

  return _react2.default.createElement(
    'a',
    _extends({ className: linkClassName, target: target, rel: rel }, rest),
    props.children
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

exports.default = Link;