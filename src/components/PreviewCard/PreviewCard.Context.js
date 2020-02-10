import React from 'react'
import PropTypes from 'prop-types'

export type PreviewCardContext = {
  isNote?: boolean
}

const contextProps: PreviewCardContext = {
  isNote: false,
}

export default React.createContext(contextProps)
