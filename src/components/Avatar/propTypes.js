import PropTypes from 'prop-types'

export const shapeTypes = PropTypes.oneOf([
  'square',
  'rounded',
  'circle'
])

export const sizeTypes = PropTypes.oneOf([
  'lg',
  'md',
  'sm',
  'xs',
  ''
])
