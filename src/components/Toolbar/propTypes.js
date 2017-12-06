import PropTypes from 'prop-types'

export const placementTypes = PropTypes.oneOf([
  'top',
  'bottom'
]).isRequired

export const themeTypes = PropTypes.oneOf([
  'default',
  'note'
]).isRequired
