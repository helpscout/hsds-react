import React from 'react'
import PropTypes from 'prop-types'

import {
  MultipleChoiceGroupUI,
  MultipleChoiceRadioUI,
} from './MessageCard.Survey.styles'

import { useSurveyContext } from '../../utils/MessageCard.Survey.context'

export const MessageCardSurveyMultipleChoice = ({ choices }) => {
  const { onSelection } = useSurveyContext()

  return (
    <MultipleChoiceGroupUI
      selectionLimits="radio"
      isResponsive
      onChange={onSelection}
    >
      {choices.map(({ id, text }) => (
        <MultipleChoiceRadioUI
          label={text}
          value={id}
          name={text}
          key={`Choice-${id}`}
        />
      ))}
    </MultipleChoiceGroupUI>
  )
}

MessageCardSurveyMultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
}
