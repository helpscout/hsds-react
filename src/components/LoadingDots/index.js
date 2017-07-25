import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

const LoadingDots = props => {
  const className = classNames('c-LoadingDots', props.className);

  return (
    <div className={className}>
      <div className="c-LoadingDots__dot c-LoadingDots__dot--one" />
      <div className="c-LoadingDots__dot c-LoadingDots__dot--two" />
      <div className="c-LoadingDots__dot c-LoadingDots__dot--three" />
    </div>
  );
};

LoadingDots.propTypes = propTypes;
LoadingDots.defaultProps = defaultProps;

export default LoadingDots;
