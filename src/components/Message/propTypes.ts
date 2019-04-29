import PropTypes from 'prop-types'

export const themeTypes = PropTypes.oneOf([
  'admin',
  'embed',
  'notifications',
  '',
])

export const typeTypes = PropTypes.oneOf(['action', 'message', ''])

export const providerContextTypes = {
  theme: themeTypes,
}

export const messageTypes = {
  from: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  ltr: PropTypes.bool,
  rtl: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  type: typeTypes,
}

export const chatTypes = Object.assign({}, messageTypes, {
  read: PropTypes.bool,
  timestamp: PropTypes.string,
})

export const bubbleTypes = Object.assign({}, chatTypes, {
  body: PropTypes.string,
  icon: PropTypes.string,
  isNote: PropTypes.bool,
  primary: PropTypes.bool,
  title: PropTypes.string,
  size: PropTypes.oneOf(['md', 'sm', '']),
  typing: PropTypes.bool,
})
