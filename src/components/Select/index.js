import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';
import { noop } from '../../utilities/constants';

const propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  seamless: PropTypes.bool,
  size: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  suffix: PropTypes.string,
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
const defaultProps = {
  autoFocus: false,
  className: '',
  disabled: false,
  error: false,
  id: '',
  name: '',
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  options: [],
  placeholder: '',
  prefix: '',
  readOnly: false,
  seamless: false,
  size: '',
  success: false,
  suffix: '',
  warning: false,
};

const Select = props => {
  const handleOnChange = (e) => {
    const value = e.currentTarget.value;
    props.onChange(value);
  }

  const {
    className,
    disabled,
    error,
    onChange,
    options,
    prefix,
    readOnly,
    seamless,
    size,
    success,
    suffix,
    value,
    warning,
    ...rest,
  } = props;

  const selectClassName = classNames(
    'c-Select',
    disabled && 'is-disabled',
    error && 'is-error',
    readOnly && 'is-readonly',
    seamless && 'is-seamless',
    success && 'is-success',
    warning && 'is-warning',
    className
  );

  const fieldClassName = classNames(
    'c-InputField',
    size && `is-${size}`,
  );

  const prefixMarkup = prefix
    ? <div className="c-Select__item c-Select__prefix">
        {prefix}
      </div>
    : null;

  const suffixMarkup = suffix
    ? <div className="c-Select__item c-Select__suffix">
        {suffix}
      </div>
    : null;

  return (
    <div className="c-InputWrapper">
      <div className={selectClassName}>
        {prefixMarkup}
        <select
          className={fieldClassName}
          disabled={disabled}
          onChange={handleOnChange}
          readOnly={readOnly}
          {...rest}
        >
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
        </select>
        {suffixMarkup}
        <div className="c-InputBackdrop" />
      </div>
    </div>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
