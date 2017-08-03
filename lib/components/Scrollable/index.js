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
  fade: _propTypes2.default.bool,
  rounded: _propTypes2.default.bool
};

var Scrollable = function Scrollable(props) {
  var children = props.children,
      fade = props.fade,
      rounded = props.rounded;


  var className = (0, _classNames2.default)('c-Scrollable', fade && 'has-fade', rounded && 'is-rounded', props.className);

  var fadeMarkup = fade ? _react2.default.createElement('div', { className: 'c-Scrollable__fade' }) : null;

  return _react2.default.createElement(
    'div',
    { className: className },
    fadeMarkup,
    _react2.default.createElement(
      'div',
      { className: 'c-Scrollable__content' },
      children
    )
  );
};

Scrollable.propTypes = propTypes;

exports.default = Scrollable;