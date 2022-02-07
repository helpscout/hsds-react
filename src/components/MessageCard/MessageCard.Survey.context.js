import React from 'react'
import { noop } from '../../utilities/other'

export const SurveyContext = React.createContext()

export function useSurveyContext() {
  const { onSelection = noop, selected = null } =
    React.useContext(SurveyContext) || {}

  return {
    onSelection,
    selected,
  }
}
