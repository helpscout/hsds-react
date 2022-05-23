import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  ConfirmationMessageUI,
  FeedbackFormUI,
  FeedbackLabelUI,
  SpinnerContainerUI,
  SubmitFeedbackFormButtonUI,
  SurveyUI,
} from './MessageCard.Survey.css'
import { SurveyContext } from '../../utils/MessageCard.Survey.context'
import Input from '../../../Input'
import Spinner from '../../../Spinner'
import Icon from '../../../Icon'
import Truncate from '../../../Truncate'

function noop() {}

const SHOW_FEEDBACK_FORM_DELAY = 600

export const MessageCardSurvey = ({
  children,
  withFeedbackForm = false,
  forceFeedbackForm = false,
  feedbackFormText = '',
  confirmationText = 'Thanks for the feedback',
  submitButtonText = 'Send',
  onSubmit = noop,
  showSpinner = false,
  showConfirmationMessage = false,
  theme,
  withShowFeedbackFormDelay = false,
}) => {
  const [feedback, setFeedback] = React.useState('')
  const [selected, setSelected] = React.useState(null)
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false)
  const shouldShowFeedbackForm = showFeedbackForm || forceFeedbackForm
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  function handleSelection(id) {
    setSelected(id)

    if (withFeedbackForm) {
      if (withShowFeedbackFormDelay) {
        setTimeout(() => {
          isMounted.current && setShowFeedbackForm(true)
        }, SHOW_FEEDBACK_FORM_DELAY)
      } else {
        setShowFeedbackForm(true)
      }
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
          {confirmationText}
        </ConfirmationMessageUI>
      </SurveyUI>
    )
  }

  const contextValue = {
    onSelection: handleSelection,
    selected,
    withFeedbackForm,
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
          <SubmitFeedbackFormButtonUI
            data-cy="beacon-message-cta-survey-submit"
            submit
            size="xxl"
            theme={theme || 'blue'}
          >
            <Truncate>{submitButtonText}</Truncate>
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
  confirmationText: PropTypes.string,
  onSubmit: PropTypes.func,
  showSpinner: PropTypes.bool,
  showConfirmationMessage: PropTypes.bool,
}
