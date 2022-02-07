import React from 'react'

export const SurveyContext = React.createContext()

export function useSurveyContext() {
  const { onSelection = () => undefined, selected = null } =
    React.useContext(SurveyContext) || {}

  return {
    onSelection,
    selected,
  }
}
