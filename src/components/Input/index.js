import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';
import { noop } from '../../utilities/constants';

const propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  bold: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderItalic: PropTypes.bool,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  seamless: PropTypes.bool,
  size: PropTypes.string,
  suffix: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  type: PropTypes.string,
  value: PropTypes.string,
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
const defaultProps = {
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
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
  warning: false,
};

class Input extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  handleOnBlur() {
    this.props.onBlur();
  }

  handleOnChange(e) {
    const value = e.currentTarget.value;
    this.setState({ value });
    this.props.onChange(value);
  }

  handleOnFocus() {
    this.props.onBlur();
  }

  render() {
    const {
      autoFocus,
      bold,
      disabled,
      error,
      id,
      name,
      placeholder,
      placeholderItalic,
      prefix,
      readOnly,
      seamless,
      size,
      success,
      suffix,
      type,
      warning,
    } = this.props;
    const { value } = this.state;

    const handleOnBlur = this.handleOnBlur.bind(this);
    const handleOnChange = this.handleOnChange.bind(this);
    const handleOnFocus = this.handleOnFocus.bind(this);

    const className = classNames(
      'c-Input',
      `c-Input--${size}`,
      bold && 'c-Input--bold',
      disabled && 'is-disabled',
      error && 'is-error',
      placeholderItalic && 'c-Input--placeholder-italic',
      readOnly && 'is-readonly',
      seamless && 'c-Input--seamless',
      success && 'is-success',
      value && 'c-Input--has-value',
      warning && 'is-warning',
      this.props.className
    );

    const prefixMarkup = prefix
      ? <div className="c-Input__item c-Input__prefix">
          {prefix}
        </div>
      : null;

    const suffixMarkup = suffix
      ? <div className="c-Input__item c-Input__suffix">
          {suffix}
        </div>
      : null;

    const statefulHelperTextMarkup = () => {
      return [error, success, warning].map(state => {
        if (state && typeof state === 'string' && state.length) {
          return (
            <div className="c-Input__helper-label">
              {state}
            </div>
          );
        }
      });
    };

    return (
      <div className="c-InputWrapper">
        <div className={className}>
          {prefixMarkup}
          <input
            autoFocus={autoFocus}
            className="c-Input__field"
            disabled={disabled}
            id={id}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
          />
          {suffixMarkup}
          <div className="c-Input__backdrop" />
        </div>
        {statefulHelperTextMarkup()}
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
