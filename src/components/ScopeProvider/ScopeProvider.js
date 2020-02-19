/* istanbul ignore file */
// from https://github.com/ItsJonQ/styled-providers
// Thank you Q!
import React, { useMemo } from 'react'
import { StyleSheetManager } from 'styled-components'

// from https://github.com/Andarist/stylis-plugin-extra-scope
function createExtraScopePlugin(extra) {
  const scope = `${extra.trim()} `

  return (context, content, selectors, parents, line, column, length, type) => {
    if (context !== 2 || type === 107) return
    for (let i = 0; i < selectors.length; i++) {
      const scoped = selectors[i].indexOf(scope) === 0
      if (!scoped) selectors[i] = `${scope}${selectors[i]}`
    }
  }
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
