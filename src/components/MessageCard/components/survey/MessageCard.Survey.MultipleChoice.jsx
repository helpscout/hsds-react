import React from 'react'
import PropTypes from 'prop-types'
import { MultipleChoiceGroupUI } from './MessageCard.Survey.css'
import { useSurveyContext } from '../../utils/MessageCard.Survey.context'
import Radio from '../../../Radio'

export const MessageCardSurveyMultipleChoice = ({ choices }) => {
  const { onSelection } = useSurveyContext()

  return (
    <MultipleChoiceGroupUI
      multiSelect={false}
      isResponsive
      onChange={onSelection}
    >
      {choices.map(({ id, text }) => (
        <Radio label={text} value={id} name={text} key={`Choice-${id}`} />
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
