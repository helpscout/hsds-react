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
  className: _propTypes2.default.string,
  size: _propTypes2.default.string,
  status: _propTypes2.default.string,
  white: _propTypes2.default.bool
};

var Badge = function Badge(props) {
  var size = props.size,
      status = props.status,
      white = props.white;

  var className = (0, _classNames2.default)('c-Badge', size && 'is-' + size, status && 'is-' + status, white && 'is-white', props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

Badge.propTypes = propTypes;

exports.default = Badge;