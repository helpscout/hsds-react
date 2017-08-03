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
  disableSelect: _propTypes2.default.bool,
  faint: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  state: _propTypes2.default.string,
  subtle: _propTypes2.default.bool,
  truncate: _propTypes2.default.bool
};
var defaultProps = {
  disableSelect: false,
  truncate: false
};

var Text = function Text(props) {
  var disableSelect = props.disableSelect,
      faint = props.faint,
      muted = props.muted,
      size = props.size,
      state = props.state,
      subtle = props.subtle,
      truncate = props.truncate;


  var className = (0, _classNames2.default)('c-Text', disableSelect && 'is-disableSelect', faint && 'is-faint', muted && 'is-muted', size && 'is-' + size, state && 'is-' + state, subtle && 'is-subtle', truncate && 'is-truncate', props.className);

  return _react2.default.createElement(
    'span',
    { className: className },
    props.children
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

exports.default = Text;