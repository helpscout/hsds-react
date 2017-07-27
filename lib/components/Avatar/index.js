'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _strings = require('../../utilities/strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  image: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  name: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.string,
  title: _propTypes2.default.string
};
var defaultProps = {
  image: false,
  name: '',
  title: ''
};

var Avatar = function Avatar(props) {
  var image = props.image,
      name = props.name,
      size = props.size,
      title = props.title;


  var className = (0, _classNames2.default)('c-Avatar', image && 'has-image', size && 'is-' + size, props.className);

  var imageTitle = title || name;

  var imageProps = {
    alt: imageTitle,
    className: 'c-Avatar__photo',
    src: image,
    title: imageTitle
  };

  var initials = (0, _strings.nameToInitials)(name);

  var contentMarkup = image ? _react2.default.createElement(
    'div',
    { className: 'c-Avatar__image' },
    _react2.default.createElement(_Image2.default, imageProps)
  ) : _react2.default.createElement(
    'div',
    { className: 'c-Avatar__title' },
    initials
  );

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'c-Avatar__crop' },
      contentMarkup
    )
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

exports.default = Avatar;