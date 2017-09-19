import PropTypes from 'prop-types'

export const messageTypes = {
  from: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  ltr: PropTypes.bool,
  rtl: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.node, PropTypes.bool])
}

export const chatTypes = Object.assign({}, messageTypes, {
  read: PropTypes.bool,
  timestamp: PropTypes.string
})

export const bubbleTypes = Object.assign({}, chatTypes, {
  primary: PropTypes.bool,
  title: PropTypes.string,
  size: PropTypes.oneOf(['md', 'sm', ''])
})
