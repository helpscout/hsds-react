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

var _Backdrop = require('./Backdrop');

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _HelpText = require('./HelpText');

var _HelpText2 = _interopRequireDefault(_HelpText);

var _Label = require('../Label');

var _Label2 = _interopRequireDefault(_Label);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _id = require('../../utilities/id');

var _other = require('../../utilities/other');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/TextField.tsx

var propTypes = {
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  helpText: _propTypes2.default.string,
  id: _propTypes2.default.string,
  label: _propTypes2.default.string,
  multiline: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  prefix: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  resizable: _propTypes2.default.bool,
  seamless: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  suffix: _propTypes2.default.string,
  type: _propTypes2.default.string,
  value: _propTypes2.default.string
};
var defaultProps = {
  autoFocus: false,
  disabled: false,
  multiline: null,
  onBlur: _other.noop,
  onChange: _other.noop,
  onFocus: _other.noop,
  readOnly: false,
  resizable: false,
  seamless: false,
  type: 'text',
  value: ''
};

var uniqueID = (0, _id.createUniqueIDFactory)('Input');

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
          disabled = _props.disabled,
          helpText = _props.helpText,
          id = _props.id,
          inputRef = _props.inputRef,
          label = _props.label,
          multiline = _props.multiline,
          name = _props.name,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          placeholder = _props.placeholder,
          prefix = _props.prefix,
          readOnly = _props.readOnly,
          resizable = _props.resizable,
          seamless = _props.seamless,
          size = _props.size,
          state = _props.state,
          suffix = _props.suffix,
          type = _props.type,
          rest = _objectWithoutProperties(_props, ['autoFocus', 'disabled', 'helpText', 'id', 'inputRef', 'label', 'multiline', 'name', 'onBlur', 'onFocus', 'placeholder', 'prefix', 'readOnly', 'resizable', 'seamless', 'size', 'state', 'suffix', 'type']);

      var _state = this.state,
          height = _state.height,
          value = _state.value;


      var handleOnChange = this.handleOnChange.bind(this);
      var handleExpandingResize = this.handleExpandingResize.bind(this);

      var className = (0, _classNames2.default)('c-Input', disabled && 'is-disabled', multiline && 'is-multiline', readOnly && 'is-readonly', resizable && 'is-resizable', seamless && 'is-seamless', state && 'is-' + state, value && 'has-value', this.props.className);

      var inputID = id || uniqueID();
      var fieldClassName = (0, _classNames2.default)('c-InputField', size && 'is-' + size);

      // Ignoring as height calculation isn't possible with JSDOM
      // (which is what Enzyme uses for tests)
      /* istanbul ignore next */
      var style = multiline && height ? { height: height } : null;

      var resizer = multiline != null ? _react2.default.createElement(_Resizer2.default, {
        contents: value || placeholder,
        currentHeight: height,
        minimumLines: typeof multiline === 'number' ? multiline : 1,
        onResize: handleExpandingResize
      }) : null;

      var labelMarkup = label ? _react2.default.createElement(
        _Label2.default,
        { 'for': inputID },
        label
      ) : null;

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

      var helpTextMarkup = helpText ? _react2.default.createElement(
        _HelpText2.default,
        { state: state },
        helpText
      ) : null;

      var inputElement = _react2.default.createElement(multiline ? 'textarea' : 'input', _extends({}, rest, {
        className: fieldClassName,
        id: inputID,
        onChange: handleOnChange,
        ref: inputRef,
        autoFocus: autoFocus,
        disabled: disabled,
        name: name,
        onBlur: onBlur,
        onFocus: onFocus,
        placeholder: placeholder,
        readOnly: readOnly,
        style: style,
        type: type,
        value: value
      }));

      return _react2.default.createElement(
        'div',
        { className: 'c-InputWrapper' },
        labelMarkup,
        _react2.default.createElement(
          'div',
          { className: className },
          prefixMarkup,
          inputElement,
          suffixMarkup,
          _react2.default.createElement(_Backdrop2.default, { disabled: disabled, state: state }),
          resizer
        ),
        helpTextMarkup
      );
    }
  }]);

  return Input;
}(_react.PureComponent);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

exports.default = Input;