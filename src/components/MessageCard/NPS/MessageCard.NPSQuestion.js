import { replaceMessageVariables } from '../utils/MessageCard.utils'
import { QuestionUI } from './MessageCard.NPS.styles'
import React from 'react'

export const NPSQuestion = ({ question, variables }) => {
  const questionToRender = replaceMessageVariables(question, variables)

  return question ? (
    <QuestionUI data-cy="beacon-nps-message-question-content">
      <div dangerouslySetInnerHTML={{ __html: questionToRender }} />
    </QuestionUI>
  ) : null
}
