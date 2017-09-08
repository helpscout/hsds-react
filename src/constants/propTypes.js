import PropTypes from 'prop-types'

export const standardSizeTypes = PropTypes.oneOf([
  'lg',
  'md',
  'sm',
  ''
])

export const statusTypes = PropTypes.oneOf([
  'error',
  'info',
  'success',
  'warning',
  ''
])

export const stateTypes = PropTypes.oneOf([
  'error',
  'success',
  'warning',
  ''
])

export const blockSelectorTagTypes = PropTypes.oneOf([
  'div',
  'span',
  'a',
  'p',
  ''
])
