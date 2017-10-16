import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  alt: PropTypes.string,
  block: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  src: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(['rounded', 'square', '']),
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

const Image = props => {
  const { className, block, shape, ...rest } = props

  const componentClassName = classNames(
    'c-Image',
    block && 'is-block',
    shape && `is-${shape}`,
    className
  )

  const imageElement = React.createElement('img', {
    ...rest,
    className: componentClassName
  })

  return imageElement
}

Image.propTypes = propTypes

export default Image
