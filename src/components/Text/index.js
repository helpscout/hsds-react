import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';

const propTypes = {
  className: PropTypes.string,
  disableSelect: PropTypes.bool,
  error: PropTypes.bool,
  faint: PropTypes.bool,
  muted: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  subtle: PropTypes.bool,
  success: PropTypes.bool,
  truncate: PropTypes.bool,
  warning: PropTypes.bool,
};
const defaultProps = {
  className: '',
  disableSelect: false,
  error: false,
  faint: false,
  muted: false,
  subtle: false,
  success: false,
  size: false,
  truncate: false,
  warning: false,
};

const Text = props => {
  const {
    disableSelect,
    error,
    faint,
    muted,
    size,
    subtle,
    success,
    truncate,
    warning,
  } = props;

  const className = classNames(
    'c-Text',
    disableSelect && 'c-Text--disable-select',
    error && 'is-error',
    faint && 'c-Text--faint',
    muted && 'c-Text--muted',
    size && `c-Text--${size}`,
    subtle && 'c-Text--subtle',
    success && 'is-success',
    truncate && 'c-Text--truncate',
    warning && 'is-warning',
    props.className
  );

  return (
    <span className={className}>
      {props.children}
    </span>
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
