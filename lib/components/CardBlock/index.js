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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  size: _propTypes2.default.string
};

var CardBlock = function CardBlock(props) {
  var size = props.size,
      rest = _objectWithoutProperties(props, ['size']);

  var className = (0, _classNames2.default)('c-CardBlock', size && 'c-CardBlock--' + size, props.className);

  return _react2.default.createElement(
    'div',
    _extends({ className: className }, rest),
    props.children
  );
};

CardBlock.propTypes = propTypes;

exports.default = CardBlock;