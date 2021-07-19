/* istanbul ignore file */
// from https://github.com/ItsJonQ/styled-providers
// Thank you Q!
import React, { useMemo } from 'react'
import { StyleSheetManager } from 'styled-components'

function createExtraScopePlugin(...scopes) {
  const extraScopePlugin = (
    context,
    content,
    selectors,
    parent,
    line,
    column,
    length
  ) => {
    if (context === -1) {
      scopes.forEach(scope => {
        selectors.push(`${scope.trim()} ${selectors[0]}`)
      })
    }
  }

  return extraScopePlugin
}

/**
 * Provides Styled Components with a scope to prefix before generated classNames.
 * Adding scope increases specificity.
 */
export default function ScopeProvider({
  children = null,
  scope = '',
  ...restProps
}) {
  const stylisPlugins = useMemo(() => {
    const extraScopePlugin = createExtraScopePlugin(scope)

    Object.defineProperty(extraScopePlugin, 'name', {
      value: 'extraScopePlugin',
    })
    return [extraScopePlugin]
  }, [scope])

  return (
    <StyleSheetManager stylisPlugins={stylisPlugins} {...restProps}>
      {children}
    </StyleSheetManager>
  )
}
