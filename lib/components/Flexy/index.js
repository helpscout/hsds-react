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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  gap: _propTypes2.default.string,
  just: _propTypes2.default.string,
  top: _propTypes2.default.bool
};
var defaultProps = {
  gap: '',
  top: false
};

var Flexy = function Flexy(props) {
  var className = (0, _classNames2.default)('c-Flexy', 'o-flexy', props.gap && 'o-flexy--gap-' + props.gap, props.just && 'o-flexy--just-' + props.just, props.top && 'o-flexy--top');

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

Flexy.propTypes = propTypes;
Flexy.defaultProps = defaultProps;

exports.default = Flexy;