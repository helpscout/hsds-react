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

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  for: _propTypes2.default.string,
  state: _propTypes2.default.string
};

var Label = function Label(props) {
  var state = props.state;


  var className = (0, _classNames2.default)('c-Label', state && 'is-' + state, props.className);

  return _react2.default.createElement(
    'label',
    { className: className, htmlFor: props.for },
    _react2.default.createElement(
      _Text2.default,
      { faint: true },
      props.children
    )
  );
};

Label.propTypes = propTypes;

exports.default = Label;