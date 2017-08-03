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

var _Backdrop = require('../Input/Backdrop');

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _HelpText = require('../Input/HelpText');

var _HelpText2 = _interopRequireDefault(_HelpText);

var _Label = require('../Label');

var _Label2 = _interopRequireDefault(_Label);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _other = require('../../utilities/other');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optionType = _propTypes2.default.oneOfType([_propTypes2.default.shape({
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  value: _propTypes2.default.string
}), _propTypes2.default.string]);

var optionsType = _propTypes2.default.arrayOf(optionType);

var groupType = _propTypes2.default.shape({
  label: _propTypes2.default.string,
  value: optionsType
});

var propTypes = {
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  helpText: _propTypes2.default.string,
  id: _propTypes2.default.string,
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  options: _propTypes2.default.oneOfType([groupType, optionType, optionsType, _propTypes2.default.array, _propTypes2.default.string]),
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  prefix: _propTypes2.default.string,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  value: _propTypes2.default.string
};
var defaultProps = {
  autoFocus: false,
  disabled: false,
  onBlur: _other.noop,
  onChange: _other.noop,
  onFocus: _other.noop,
  options: [],
  value: ''
};

var PLACEHOLDER_VALUE = '__placeholder__';

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this));

    _this.state = {
      placeholder: props.placeholder,
      value: props.value
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'handleOnChange',
    value: function handleOnChange(e) {
      var value = e.currentTarget.value;
      this.props.onChange(value);

      this.setState({
        placeholder: false,
        value: value
      });
    }
  }, {
    key: 'hasPlaceholder',
    value: function hasPlaceholder() {
      return this.state.value === '' && this.state.placeholder;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          helpText = _props.helpText,
          id = _props.id,
          label = _props.label,
          onChange = _props.onChange,
          options = _props.options,
          placeholder = _props.placeholder,
          prefix = _props.prefix,
          seamless = _props.seamless,
          size = _props.size,
          state = _props.state,
          success = _props.success,
          value = _props.value,
          rest = _objectWithoutProperties(_props, ['className', 'disabled', 'helpText', 'id', 'label', 'onChange', 'options', 'placeholder', 'prefix', 'seamless', 'size', 'state', 'success', 'value']);

      var hasPlaceholder = this.hasPlaceholder();

      var selectClassName = (0, _classNames2.default)('c-Select', disabled && 'is-disabled', hasPlaceholder && 'has-placeholder', seamless && 'is-seamless', state && 'is-' + state, className);

      var fieldClassName = (0, _classNames2.default)('c-InputField', size && 'is-' + size);

      var renderOptions = function renderOptions(option) {
        // HTML <optgroup> only allows for single level nesting
        var hasOptions = option.hasOwnProperty('value') && Array.isArray(option.value);
        // Group
        if (hasOptions) {
          var _label = option.label;
          // Recursion!
          return _react2.default.createElement(
            'optgroup',
            { label: _label, key: _label },
            option.value.map(renderOptions)
          );
        }
        // Option
        if (typeof option === 'string') {
          return _react2.default.createElement(
            'option',
            { key: option, value: option },
            option
          );
        } else {
          return _react2.default.createElement(
            'option',
            {
              key: option.value,
              value: option.value,
              disabled: option.disabled
            },
            option.label
          );
        }
      };

      var optionsMarkup = Array.isArray(options) ? options.map(renderOptions) : renderOptions(options);

      var placeholderMarkup = hasPlaceholder ? _react2.default.createElement('option', {
        label: this.state.placeholder,
        value: PLACEHOLDER_VALUE,
        disabled: true,
        hidden: true
      }) : null;

      var labelMarkup = label ? _react2.default.createElement(
        _Label2.default,
        { 'for': id },
        label
      ) : null;

      var prefixMarkup = prefix ? _react2.default.createElement(
        'div',
        { className: 'c-Select__item c-Select__prefix' },
        prefix
      ) : null;

      var helpTextMarkup = helpText ? _react2.default.createElement(
        _HelpText2.default,
        { state: state },
        helpText
      ) : null;

      var selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value;

      return _react2.default.createElement(
        'div',
        { className: 'c-InputWrapper' },
        labelMarkup,
        _react2.default.createElement(
          'div',
          { className: selectClassName },
          prefixMarkup,
          _react2.default.createElement(
            'select',
            _extends({
              className: fieldClassName,
              disabled: disabled,
              id: id,
              onChange: function onChange(e) {
                return _this2.handleOnChange(e);
              },
              value: selectedValue
            }, rest),
            placeholderMarkup,
            optionsMarkup
          ),
          _react2.default.createElement('div', { className: 'c-SelectIcon' }),
          _react2.default.createElement(_Backdrop2.default, { disabled: disabled, state: state })
        ),
        helpTextMarkup
      );
    }
  }]);

  return Select;
}(_react.PureComponent);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

exports.default = Select;