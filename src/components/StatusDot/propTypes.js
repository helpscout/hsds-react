import PropTypes from 'prop-types'

export const statusTypes = PropTypes.oneOf([
  'online',
  'offline',
  'busy',
  'inactive'
])
