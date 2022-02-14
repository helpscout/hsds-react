import React from 'react'

export const SurveyContext = React.createContext()

function noop() {}

export function useSurveyContext() {
  const { onSelection = noop, selected = null } =
    React.useContext(SurveyContext) || {}

  return {
    onSelection,
    selected,
  }
}
