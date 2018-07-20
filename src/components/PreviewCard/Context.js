// @flow
import createContext from 'create-react-context'

export type PreviewCardContext = {
  isNote?: boolean,
}

const contextProps: PreviewCardContext = {
  isNote: false,
}

export default createContext(contextProps)
