'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/TextField.tsx

var propTypes = {
  autoFocus: _propTypes2.default.bool,
  bold: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  error: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  id: _propTypes2.default.string,
  multiline: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  placeholderItalic: _propTypes2.default.bool,
  prefix: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  resizable: _propTypes2.default.bool,
  seamless: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  success: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  suffix: _propTypes2.default.string,
  type: _propTypes2.default.string,
  value: _propTypes2.default.string,
  warning: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string])
};
var defaultProps = {
  autoFocus: false,
  bold: false,
  className: '',
  disabled: false,
  error: false,
  id: '',
  multiline: null,
  name: '',
  onBlur: _constants.noop,
  onChange: _constants.noop,
  onFocus: _constants.noop,
  placeholder: '',
  placeholderItalic: false,
  prefix: '',
  readOnly: false,
  resizable: false,
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
      height: null,
      value: props.value
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'handleOnChange',
    value: function handleOnChange(e) {
      var value = e.currentTarget.value;
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: 'handleExpandingResize',
    value: function handleExpandingResize(height) {
      this.setState({ height: height });
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
          inputRef = _props.inputRef,
          multiline = _props.multiline,
          name = _props.name,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          placeholder = _props.placeholder,
          placeholderItalic = _props.placeholderItalic,
          prefix = _props.prefix,
          readOnly = _props.readOnly,
          resizable = _props.resizable,
          seamless = _props.seamless,
          size = _props.size,
          success = _props.success,
          suffix = _props.suffix,
          type = _props.type,
          warning = _props.warning,
          rest = _objectWithoutProperties(_props, ['autoFocus', 'bold', 'disabled', 'error', 'id', 'inputRef', 'multiline', 'name', 'onBlur', 'onFocus', 'placeholder', 'placeholderItalic', 'prefix', 'readOnly', 'resizable', 'seamless', 'size', 'success', 'suffix', 'type', 'warning']);

      var _state = this.state,
          height = _state.height,
          value = _state.value;


      var handleOnChange = this.handleOnChange.bind(this);
      var handleExpandingResize = this.handleExpandingResize.bind(this);

      var className = (0, _classNames2.default)('c-Input', 'c-Input--' + size, bold && 'c-Input--bold', disabled && 'is-disabled', error && 'is-error', multiline && 'c-Input--multiline', readOnly && 'is-readonly', resizable && 'c-Input--resizable', seamless && 'c-Input--seamless', success && 'is-success', value && 'c-Input--has-value', warning && 'is-warning', this.props.className);

      var style = multiline && height ? { height: height } : null;

      var resizer = multiline != null ? _react2.default.createElement(_Resizer2.default, {
        contents: value || placeholder,
        currentHeight: height,
        minimumLines: typeof multiline === 'number' ? multiline : 1,
        onResize: handleExpandingResize
      }) : null;

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

      var inputElement = _react2.default.createElement(multiline ? 'textarea' : 'input', _extends({}, rest, {
        autoFocus: autoFocus,
        disabled: disabled,
        id: id,
        name: name,
        onBlur: onBlur,
        onFocus: onFocus,
        placeholder: placeholder,
        readOnly: readOnly,
        style: style,
        type: type,
        value: value,
        className: 'c-Input__field',
        onChange: handleOnChange,
        ref: inputRef
      }));

      return _react2.default.createElement(
        'div',
        { className: 'c-InputWrapper' },
        _react2.default.createElement(
          'div',
          { className: className },
          prefixMarkup,
          inputElement,
          suffixMarkup,
          _react2.default.createElement('div', { className: 'c-Input__backdrop' }),
          resizer
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