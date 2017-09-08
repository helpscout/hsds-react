import PropTypes from 'prop-types'

export const valueTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
])
