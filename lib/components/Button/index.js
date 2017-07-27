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
  onClick: _propTypes2.default.func,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  type: _propTypes2.default.string
};
var defaultProps = {
  disabled: false,
  onClick: function onClick() {},
  size: '',
  state: '',
  type: ''
};

var Button = function Button(props) {
  var disabled = props.disabled,
      onClick = props.onClick,
      size = props.size,
      state = props.state,
      type = props.type;


  var className = (0, _classNames2.default)('c-Button', size && 'c-Button--' + size, state && 'is-' + state, type && 'c-Button--' + type, props.className);

  return _react2.default.createElement(
    'button',
    { className: className, disabled: disabled, onClick: onClick },
    props.children
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

exports.default = Button;