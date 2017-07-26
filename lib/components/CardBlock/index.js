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
  size: _propTypes2.default.string
};
var defaultProps = {
  className: '',
  size: 'md'
};

var CardBlock = function CardBlock(props) {
  var size = props.size;


  var className = (0, _classNames2.default)('c-CardBlock', 'c-CardBlock--' + size, props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

CardBlock.propTypes = propTypes;
CardBlock.defaultProps = defaultProps;

exports.default = CardBlock;