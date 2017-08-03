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
  focusable: _propTypes2.default.bool
};

var defaultProps = {
  focusable: false
};

var VisuallyHidden = function VisuallyHidden(props) {
  var focusable = props.focusable;


  var className = (0, _classNames2.default)('c-VisuallyHidden', focusable && 'is-focusable', props.className);

  var tabIndex = focusable ? 1 : null;

  return _react2.default.createElement(
    'span',
    { className: className, tabIndex: tabIndex },
    props.children
  );
};

VisuallyHidden.propTypes = propTypes;
VisuallyHidden.defaultProps = defaultProps;

exports.default = VisuallyHidden;