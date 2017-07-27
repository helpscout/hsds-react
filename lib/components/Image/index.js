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
  alt: _propTypes2.default.string,
  className: _propTypes2.default.string,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  src: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

var Image = function Image(props) {
  var className = props.className,
      rest = _objectWithoutProperties(props, ['className']);

  var ImageClassName = (0, _classNames2.default)('c-Image', className);

  var imageElement = _react2.default.createElement('img', _extends({}, rest, {
    className: ImageClassName
  }));

  return imageElement;
};

Image.propTypes = propTypes;

exports.default = Image;