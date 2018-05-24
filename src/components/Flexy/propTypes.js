import PropTypes from 'prop-types'

export const alignTypes = PropTypes.oneOf(['top', 'middle', 'bottom', ''])

export const gapTypes = PropTypes.oneOf([
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
  'none',
  '',
])

export const justTypes = PropTypes.oneOf([
  'default',
  'left',
  'center',
  'right',
  '',
])
