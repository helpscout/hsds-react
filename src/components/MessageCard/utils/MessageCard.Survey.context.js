import { createContext, useContext } from 'react'
import { noop } from './MessageCard.utils'

export const SurveyContext = createContext()

export function useSurveyContext() {
  const {
    onSelection = noop,
    selected = null,
    withFeedbackForm = false,
    showFeedbackForm = false,
  } = useContext(SurveyContext) || {}

  return {
    onSelection,
    selected,
    withFeedbackForm,
    showFeedbackForm,
  }
}
