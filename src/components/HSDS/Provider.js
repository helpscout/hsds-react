import React from 'react'
import ScopeProvider from '../ScopeProvider'
import GlobalStyle from './GlobalStyle'

const Provider = props => {
  const { scope = 'hsds-react' } = props
  console.log('scope: ', `.${scope}`)
  return (
    <>
      <GlobalStyle scope={`.${scope}`} />
      <div className={scope}>
        <ScopeProvider scope={`.${scope}`}>{props.children}</ScopeProvider>
      </div>
    </>
  )
}

Provider.displayName = 'HSDSProvider'

export default Provider
