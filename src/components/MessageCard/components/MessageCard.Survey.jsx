import React from 'react'
import PropTypes from 'prop-types'
import {
  ConfirmationMessageUI,
  FeedbackFormUI,
  FeedbackLabelUI,
  SpinnerContainerUI,
  SubmitFeedbackFormButtonUI,
  SurveyUI,
} from './MessageCard.Survey.css'
import { SurveyContext } from '../MessageCard.Survey.context'
import { noop } from '../../../utilities/other'
import Input from '../../Input'
import Spinner from '../../Spinner'
import Icon from '../../Icon'

export const MessageCardSurvey = ({
  children,
  withFeedbackForm = false,
  forceFeedbackForm = false,
  feedbackFormText = '',
  onSubmit = noop,
  showSpinner = false,
  showConfirmationMessage = false,
}) => {
  const [feedback, setFeedback] = React.useState('')
  const [selected, setSelected] = React.useState(null)
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false)
  const shouldShowFeedbackForm = showFeedbackForm || forceFeedbackForm

  function handleSelection(id) {
    setSelected(id)

    if (withFeedbackForm) {
      setShowFeedbackForm(true)
      return
    }

    onSubmit({
      selected: id,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      selected,
      feedback,
    })
  }

  if (showConfirmationMessage) {
    return (
      <SurveyUI data-cy="beacon-message-cta-survey">
        <ConfirmationMessageUI>
          <Icon name="tick-small" inline size={24} />
          Thanks for the feedback
        </ConfirmationMessageUI>
      </SurveyUI>
    )
  }

  const contextValue = {
    onSelection: handleSelection,
    selected,
  }

  return (
    <SurveyUI data-cy="beacon-message-cta-survey">
      <SurveyContext.Provider value={contextValue}>
        {children}
      </SurveyContext.Provider>

      {shouldShowFeedbackForm && (
        <FeedbackFormUI onSubmit={handleSubmit}>
          <FeedbackLabelUI htmlFor="survey-comment">
            {feedbackFormText}
          </FeedbackLabelUI>
          <Input
            id="survey-comment"
            name="survey-comment"
            withCharValidator={true}
            charValidatorLimit={120}
            multiline={3}
            value={feedback}
            onChange={value => setFeedback(value)}
          />
          <SubmitFeedbackFormButtonUI submit size="xxl" theme="blue">
            Send
          </SubmitFeedbackFormButtonUI>
        </FeedbackFormUI>
      )}

      {showSpinner && (
        <SpinnerContainerUI>
          <Spinner />
        </SpinnerContainerUI>
      )}
    </SurveyUI>
  )
}

MessageCardSurvey.propTypes = {
  children: PropTypes.node.isRequired,
  withFeedbackForm: PropTypes.bool,
  forceFeedbackForm: PropTypes.bool,
  feedbackFormText: PropTypes.string,
  onSubmit: PropTypes.func,
  showSpinner: PropTypes.bool,
  showConfirmationMessage: PropTypes.bool,
}
