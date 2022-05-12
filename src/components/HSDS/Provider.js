/* istanbul ignore file */
import React from 'react'
import ScopeProvider from '../ScopeProvider'
import GlobalStyle from './GlobalStyle'

export const GlobalContext = React.createContext()

const Provider = props => {
  const { scope = 'hsds-react', cssReset = false } = props
  const contextValue = {
    getCurrentScope: () => scope,
  }
  return (
    <>
      <GlobalStyle scope={`.${scope}`} cssReset={cssReset} />
      <GlobalContext.Provider value={contextValue}>
        <div className={scope}>
          <ScopeProvider scope={`.${scope}`}>{props.children}</ScopeProvider>
        </div>
      </GlobalContext.Provider>
    </>
  )
}

Provider.displayName = 'HSDSProvider'

export default Provider
