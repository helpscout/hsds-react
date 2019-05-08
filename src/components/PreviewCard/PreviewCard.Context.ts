import createContext from '@helpscout/react-utils/dist/createContext'

export type PreviewCardContext = {
  isNote?: boolean
}

const contextProps: PreviewCardContext = {
  isNote: false,
}

export default createContext(contextProps)
