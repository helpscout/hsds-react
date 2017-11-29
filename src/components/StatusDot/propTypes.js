import PropTypes from 'prop-types'

export const sizeTypes = PropTypes.oneOf([
  'md',
  'sm'
])

export const statusTypes = PropTypes.oneOf([
  'online',
  'offline',
  'busy',
  'active',
  'inactive'
])
