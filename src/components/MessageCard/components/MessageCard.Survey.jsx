import React from 'react'
import PropTypes from 'prop-types'
import {
  ConfirmationMessageUI,
  FeedbackFormUI,
  SpinnerContainerUI,
  SurveyUI,
} from './MessageCard.Survey.css'
import Input from '../../Input'
import Button from '../../Button'
import Spinner from '../../Spinner'
import Icon from '../../Icon'

export const MessageCardSurvey = ({
  children,
  withFeedbackForm = false,
  forceFeedbackForm = false,
  feedbackFormText = '',
  onSubmit = () => {},
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

  function renderChildren() {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        selected,
        onSelection: handleSelection,
      })
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

  return (
    <SurveyUI data-cy="beacon-message-cta-survey">
      {renderChildren()}

      {shouldShowFeedbackForm && (
        <FeedbackFormUI onSubmit={handleSubmit}>
          <label htmlFor="survey-comment">{feedbackFormText}</label>
          <Input
            id="survey-comment"
            name="survey-comment"
            withCharValidator={true}
            charValidatorLimit={120}
            multiline={3}
            value={feedback}
            onChange={value => setFeedback(value)}
          />
          <Button submit theme="blue">
            Send
          </Button>
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
