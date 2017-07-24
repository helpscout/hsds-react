import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';
import { noop } from '../../utilities/constants';

const propTypes = {
  onBlur: PropTypes.func,
  onClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFocus: PropTypes.func,
  className: PropTypes.string,
  hover: PropTypes.bool,
  href: PropTypes.string,
  seamless: PropTypes.bool,
  selector: PropTypes.string
};
const defaultProps = {
  onBlur: noop,
  onClick: false,
  onFocus: noop,
  className: '',
  hover: false,
  href: '',
  seamless: false,
  selector: 'div'
};

const Card = props => {
  const { hover, href, onClick, seamless, selector } = props;

  const className = classNames(
    'c-Card',
    (onClick || href) && 'c-Card--clickable',
    (onClick || hover || href) && 'c-Card--hover',
    seamless && 'c-Card--seamless',
    props.className
  );

  const selectorTag = href ? 'a' : selector;

  const element = React.createElement(
    selectorTag,
    {
      ...props,
      className
    },
    props.children
  );

  return element;
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
