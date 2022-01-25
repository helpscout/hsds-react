import React from 'react'
import {
  ConfirmationMessageUI,
  EmojiButtonUI,
  FeedbackFormUI,
  SpinnerContainerUI,
  SurveyOptionsUI,
  SurveyUI,
} from '../MessageCard.css'
import Input from '../../Input'
import Button from '../../Button'
import Spinner from '../../Spinner'
import Icon from '../../Icon'

export const MessageCardSurvey = ({
  withFeedbackForm = false,
  forceFeedbackForm = false,
  feedbackFormText = '',
  onSubmit = () => {},
  showSpinner = false,
  showConfirmationMessage = false,
}) => {
  const buttons = [
    { id: 'yes', text: '👍' },
    { id: 'no', text: '👎' },
  ]

  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  const [feedback, setFeedback] = React.useState('')
  const shouldShowFeedbackForm = showFeedbackForm || forceFeedbackForm

  function handleClick(id) {
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

  return (
    <SurveyUI data-cy="beacon-message-cta-survey">
      <SurveyOptionsUI>
        {buttons.map(({ id, text }) => (
          <EmojiButtonUI
            key={id}
            onClick={() => handleClick(id)}
            selected={selected === id}
          >
            <span role="img" aria-label="cool">
              {text}
            </span>
          </EmojiButtonUI>
        ))}
      </SurveyOptionsUI>

      {shouldShowFeedbackForm && (
        <FeedbackFormUI onSubmit={handleSubmit}>
          <label htmlFor="survey-comment">{feedbackFormText}</label>
          <Input
            id="survey-comment"
            name="survey-comment"
            multiline={3}
            withCharValidator={true}
            charValidatorLimit={120}
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
