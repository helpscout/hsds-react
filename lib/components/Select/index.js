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

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _constants = require('../../utilities/constants');

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
  error: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  options: _propTypes2.default.oneOfType([groupType, optionType, optionsType, _propTypes2.default.array, _propTypes2.default.string]),
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  prefix: _propTypes2.default.string,
  size: _propTypes2.default.string,
  success: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  value: _propTypes2.default.string,
  warning: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string])
};
var defaultProps = {
  autoFocus: false,
  disabled: false,
  error: false,
  onBlur: _constants.noop,
  onChange: _constants.noop,
  onFocus: _constants.noop,
  options: [],
  success: false,
  value: '',
  warning: false
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
          error = _props.error,
          onChange = _props.onChange,
          options = _props.options,
          placeholder = _props.placeholder,
          prefix = _props.prefix,
          seamless = _props.seamless,
          size = _props.size,
          success = _props.success,
          warning = _props.warning,
          value = _props.value,
          rest = _objectWithoutProperties(_props, ['className', 'disabled', 'error', 'onChange', 'options', 'placeholder', 'prefix', 'seamless', 'size', 'success', 'warning', 'value']);

      var hasPlaceholder = this.hasPlaceholder();

      var selectClassName = (0, _classNames2.default)('c-Select', disabled && 'is-disabled', error && 'is-error', hasPlaceholder && 'has-placeholder', seamless && 'is-seamless', success && 'is-success', warning && 'is-warning', className);

      var fieldClassName = (0, _classNames2.default)('c-InputField', size && 'is-' + size);

      var renderOptions = function renderOptions(option) {
        // HTML <optgroup> only allows for single level nesting
        var hasOptions = option.hasOwnProperty('value') && Array.isArray(option.value);
        // Group
        if (hasOptions) {
          var label = option.label;
          // Recursion!
          return _react2.default.createElement(
            'optgroup',
            { label: label, key: label },
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

      var prefixMarkup = prefix ? _react2.default.createElement(
        'div',
        { className: 'c-Select__item c-Select__prefix' },
        prefix
      ) : null;

      var selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value;

      var statefulHelperTextMarkup = function statefulHelperTextMarkup() {
        return [error, success, warning].map(function (state) {
          if (state && typeof state === 'string' && state.length) {
            return _react2.default.createElement(
              'div',
              { className: 'c-InputHelperLabel', key: state },
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
          { className: selectClassName },
          prefixMarkup,
          _react2.default.createElement(
            'select',
            _extends({
              className: fieldClassName,
              disabled: disabled,
              onChange: function onChange(e) {
                return _this2.handleOnChange(e);
              },
              value: selectedValue
            }, rest),
            placeholderMarkup,
            optionsMarkup
          ),
          _react2.default.createElement('div', { className: 'c-SelectIcon' }),
          _react2.default.createElement('div', { className: 'c-InputBackdrop' })
        ),
        statefulHelperTextMarkup()
      );
    }
  }]);

  return Select;
}(_react.PureComponent);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

exports.default = Select;