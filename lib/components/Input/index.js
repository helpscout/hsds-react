'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool,
  bold: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  error: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  placeholderItalic: _propTypes2.default.bool,
  prefix: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  seamless: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  suffix: _propTypes2.default.string,
  success: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  type: _propTypes2.default.string,
  value: _propTypes2.default.string,
  warning: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string])
};
var defaultProps = {
  onBlur: _constants.noop,
  onChange: _constants.noop,
  onFocus: _constants.noop,
  autoFocus: false,
  bold: false,
  className: '',
  disabled: false,
  error: false,
  id: '',
  name: '',
  placeholder: '',
  placeholderItalic: false,
  prefix: '',
  readOnly: false,
  seamless: false,
  size: 'md',
  success: false,
  suffix: '',
  type: 'text',
  value: '',
  warning: false
};

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'handleOnBlur',
    value: function handleOnBlur() {
      this.props.onBlur();
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(e) {
      var value = e.currentTarget.value;
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: 'handleOnFocus',
    value: function handleOnFocus() {
      this.props.onBlur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          autoFocus = _props.autoFocus,
          bold = _props.bold,
          disabled = _props.disabled,
          error = _props.error,
          id = _props.id,
          name = _props.name,
          placeholder = _props.placeholder,
          placeholderItalic = _props.placeholderItalic,
          prefix = _props.prefix,
          readOnly = _props.readOnly,
          seamless = _props.seamless,
          size = _props.size,
          success = _props.success,
          suffix = _props.suffix,
          type = _props.type,
          warning = _props.warning;
      var value = this.state.value;


      var handleOnBlur = this.handleOnBlur.bind(this);
      var handleOnChange = this.handleOnChange.bind(this);
      var handleOnFocus = this.handleOnFocus.bind(this);

      var className = (0, _classNames2.default)('c-Input', 'c-Input--' + size, bold && 'c-Input--bold', disabled && 'is-disabled', error && 'is-error', placeholderItalic && 'c-Input--placeholder-italic', readOnly && 'is-readonly', seamless && 'c-Input--seamless', success && 'is-success', value && 'c-Input--has-value', warning && 'is-warning', this.props.className);

      var prefixMarkup = prefix ? _react2.default.createElement(
        'div',
        { className: 'c-Input__item c-Input__prefix' },
        prefix
      ) : null;

      var suffixMarkup = suffix ? _react2.default.createElement(
        'div',
        { className: 'c-Input__item c-Input__suffix' },
        suffix
      ) : null;

      var statefulHelperTextMarkup = function statefulHelperTextMarkup() {
        return [error, success, warning].map(function (state) {
          if (state && typeof state === 'string' && state.length) {
            return _react2.default.createElement(
              'div',
              { className: 'c-Input__helper-label' },
              state
            );
          }
        });
      };

      return _react2.default.createElement(
        'div',
        { className: 'c-InputWrapper' },
        _react2.default.createElement(
          'div',
          { className: className },
          prefixMarkup,
          _react2.default.createElement('input', {
            autoFocus: autoFocus,
            className: 'c-Input__field',
            disabled: disabled,
            id: id,
            onBlur: handleOnBlur,
            onChange: handleOnChange,
            onFocus: handleOnFocus,
            name: name,
            placeholder: placeholder,
            type: type,
            value: value
          }),
          suffixMarkup,
          _react2.default.createElement('div', { className: 'c-Input__backdrop' })
        ),
        statefulHelperTextMarkup()
      );
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

exports.default = Input;