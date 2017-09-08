import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

const Image = props => {
  const { className, ...rest } = props

  const componentClassName = classNames('c-Image', className)

  const imageElement = React.createElement('img', {
    ...rest,
    className: componentClassName
  })

  return imageElement
}

Image.propTypes = propTypes

export default Image
