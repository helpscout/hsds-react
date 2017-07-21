import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';

const propTypes = {
  gap: PropTypes.string,
  just: PropTypes.string,
  top: PropTypes.bool,
};
const defaultProps = {
  gap: '',
  top: false,
};

const Flexy = props => {
  const className = classNames(
    'c-Flexy',
    'o-flexy',
    props.gap && `o-flexy--gap-${props.gap}`,
    props.just && `o-flexy--just-${props.just}`,
    props.top && 'o-flexy--top'
  );

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

Flexy.propTypes = propTypes;
Flexy.defaultProps = defaultProps;

export default Flexy;
