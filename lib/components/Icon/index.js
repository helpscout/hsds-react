'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _other = require('../../utilities/other');

var _VisuallyHidden = require('../VisuallyHidden');

var _VisuallyHidden2 = _interopRequireDefault(_VisuallyHidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  center: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  clickable: _propTypes2.default.bool,
  ignoreClick: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func,
  size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  title: _propTypes2.default.string
};
var defaultProps = {
  clickable: false,
  center: false,
  ignoreClick: true,
  muted: false,
  name: null,
  onClick: _other.noop
};

var Icon = function Icon(props) {
  var center = props.center,
      clickable = props.clickable,
      ignoreClick = props.ignoreClick,
      muted = props.muted,
      onClick = props.onClick,
      name = props.name,
      size = props.size,
      title = props.title;


  var className = (0, _classNames2.default)('c-Icon', center && 'is-center', clickable && 'is-clickable', !clickable && ignoreClick && 'is-noInteract', muted && 'is-muted', size && 'is-' + size, props.className);

  var src = { __html: _icons2.default[name] };
  var iconTitle = title || name;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      onClick: onClick,
      'data-icon-name': name
    },
    _react2.default.createElement('div', {
      className: 'c-Icon__icon',
      dangerouslySetInnerHTML: src,
      title: iconTitle
    }),
    _react2.default.createElement(
      _VisuallyHidden2.default,
      null,
      iconTitle
    )
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

exports.default = Icon;