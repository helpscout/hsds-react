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
  disabled: _propTypes2.default.bool,
  state: _propTypes2.default.string
};

var Backdrop = function Backdrop(props) {
  var disabled = props.disabled,
      state = props.state;


  var className = (0, _classNames2.default)('c-InputBackdrop', disabled && 'is-disabled', state && 'is-' + state, props.className);

  return _react2.default.createElement('div', { className: className, role: 'presentation' });
};

Backdrop.propTypes = propTypes;

exports.default = Backdrop;