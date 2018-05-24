import PropTypes from 'prop-types'

export const themeTypes = PropTypes.oneOf(['default', 'preview', ''])

export const providerContextTypes = {
  theme: themeTypes,
}
