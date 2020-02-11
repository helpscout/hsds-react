import PropTypes from 'prop-types'

TextShade = PropTypes.oneOf([
  'default',
  'subtle',
  'muted',
  'faint',
  'extraMuted',
  '',
  null,
])

UIState = PropTypes.oneOf(['default', 'error', 'success', 'warning', '', null])

UIStatus = PropTypes.oneOf(['error', 'info', 'success', 'warning', '', null])

UISize = PropTypes.oneOf(['xs', 'xssm', 'sm', 'md', 'lg', '', null])

BlockSelectorTag = PropTypes.oneOf(['div', 'span', 'a', 'p', ''])
