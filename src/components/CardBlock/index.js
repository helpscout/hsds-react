import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};
const defaultProps = {
  className: '',
  size: 'md'
};

const CardBlock = props => {
  const { size } = props;

  const className = classNames(
    'c-CardBlock',
    `c-CardBlock--${size}`,
    props.className
  );

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

CardBlock.propTypes = propTypes;
CardBlock.defaultProps = defaultProps;

export default CardBlock;
