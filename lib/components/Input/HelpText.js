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
  state: _propTypes2.default.string
};

var HelpText = function HelpText(props) {
  var state = props.state;


  var className = (0, _classNames2.default)('c-InputHelpText', state && 'is-' + state, props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

HelpText.propTypes = propTypes;

exports.default = HelpText;