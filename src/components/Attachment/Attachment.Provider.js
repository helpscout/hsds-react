import React, { createContext, useMemo } from 'react'

export const AttachmentContext = createContext()

const propTypes = {
  theme: () => null,
}

const defaultProps = {
  theme: 'default',
}

const Provider = ({ theme, children, ...rest }) => {
  const contextValue = useMemo(() => {
    return {
      theme,
    }
  }, [theme])

  return (
    <AttachmentContext.Provider value={contextValue}>
      {children}
    </AttachmentContext.Provider>
  )
}

Provider.propTypes = propTypes
Provider.defaultProps = defaultProps
Provider.displayName = 'AttachmentProvider'

export default Provider
