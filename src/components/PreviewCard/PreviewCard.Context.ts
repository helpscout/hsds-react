import * as React from 'react'

export type PreviewCardContext = {
  isNote?: boolean
}

const contextProps: PreviewCardContext = {
  isNote: false,
}

export default React.createContext(contextProps)
