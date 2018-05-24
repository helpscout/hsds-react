import PropTypes from 'prop-types'

export const placementTypes = PropTypes.oneOf(['top', 'bottom']).isRequired

export const sizeTypes = PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs'])
  .isRequired

export const themeTypes = PropTypes.oneOf(['default', 'note']).isRequired
