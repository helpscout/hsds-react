import { useSurveyContext } from '../../utils/MessageCard.Survey.context'
import React from 'react'
import classNames from 'classnames'
import {
  ScoreLabelsUI,
  ScoreLabelUI,
  ScoresUI,
  ScoreUI,
  SurveyNPSUI,
} from './MessageCard.Survey.NPS.styles'

const scores = [...Array(11)]

export const MessageCardSurveyNPS = ({
  detractor = 'Not likely',
  promoter = 'Very likely',
}) => {
  const { onSelection, selected, withFeedbackForm } = useSurveyContext()

  return (
    <SurveyNPSUI>
      <ScoresUI>
        {scores.map((_, index) => {
          const className = classNames(
            'c-NPSScore',
            selected === index && 'is-selected'
          )
          return (
            <ScoreUI
              key={index}
              className={className}
              onClick={() => onSelection(index)}
              size="sm"
            >
              {index.toString()}
            </ScoreUI>
          )
        })}
      </ScoresUI>
      <ScoreLabelsUI
        className={selected !== null && withFeedbackForm && 'is-hidden'}
      >
        <ScoreLabelUI>{detractor}</ScoreLabelUI>
        <ScoreLabelUI>{promoter}</ScoreLabelUI>
      </ScoreLabelsUI>
    </SurveyNPSUI>
  )
}
