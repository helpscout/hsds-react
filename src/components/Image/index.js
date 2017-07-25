import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/classNames';

const propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.number,
};
const defaultProps = {
  alt: '',
  className: '',
  height: '',
  src: '',
  style: {},
  title: '',
  width: '',
};

const Image = props => {
  const { className, ...rest } = props;

  const ImageClassName = classNames('c-Image', className);

  const imageElement = React.createElement('img', {
    ...rest,
    className: ImageClassName,
  });

  return imageElement;
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
