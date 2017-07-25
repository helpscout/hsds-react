import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';
import { nameToInitials } from '../../utilities/strings';

const propTypes = {
  className: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
};
const defaultProps = {
  className: '',
  image: false,
  name: '',
  title: '',
  size: '',
};

const Avatar = props => {
  const {
    image,
    name,
    size,
    title,
  } = props;

  const className = classNames(
    'c-Avatar',
    image && 'has-image',
    size && `c-Avatar--${size}`,
    props.className
  );
  
  const initials = nameToInitials(name);

  // TODO: Use Image component
  const contentMarkup = image ? 
  (
    <div className="c-Avatar__image">
      <img src={image} alt={title} title={title} />
    </div>
  ) : (
    <div className="c-Avatar__title">
      {initials}
    </div>
  );

  return (
    <div className={className}>
      <div className="c-Avatar__crop">
        {contentMarkup}
      </div>
    </div>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
