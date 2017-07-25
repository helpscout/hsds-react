import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';
import { noop } from '../../utilities/constants';

const propTypes = {
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  to: PropTypes.string,
};
const defaultProps = {
  className: '',
  external: false,
  href: '#',
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  to: '',
};

const Link = props => {
  const { className, external, ...rest } = props;

  const linkClassName = classNames('c-Link', className);

  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  // Note: If we're going to support React Router, then the `to` prop
  // should render React Router's <Link> component.

  return (
    <a className={linkClassName} target={target} rel={rel} {...rest}>
      {props.children}
    </a>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
