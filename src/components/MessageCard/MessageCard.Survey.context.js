import { createContext, useContext } from 'react'

export const SurveyContext = createContext()

function noop() {}

export function useSurveyContext() {
  const { onSelection = noop, selected = null, withFeedbackForm = false } =
    useContext(SurveyContext) || {}

  return {
    onSelection,
    selected,
    withFeedbackForm,
  }
}
