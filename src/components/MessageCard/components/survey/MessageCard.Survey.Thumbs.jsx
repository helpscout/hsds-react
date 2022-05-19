import React from 'react'
import PropTypes from 'prop-types'
import { EmojiButtonUI, SurveyOptionsUI } from './MessageCard.Survey.css'
import { useSurveyContext } from '../../utils/MessageCard.Survey.context'
import { useButtonResizeOnSelection } from '../../utils/MessageCard.hooks'

const buttons = [
  { id: 'thumbs-up', text: '👍' },
  { id: 'thumbs-down', text: '👎' },
]

export const MessageCardSurveyThumbs = () => {
  const { onSelection, selected, withFeedbackForm } = useSurveyContext()
  const { buttonSize, handleOnClick } = useButtonResizeOnSelection({
    disableTransition: !withFeedbackForm,
    onSelection,
  })

  const className = `is-${buttonSize}`

  return (
    <SurveyOptionsUI>
      {buttons.map(({ id, text }) => (
        <EmojiButtonUI
          key={id}
          onClick={() => handleOnClick(id)}
          className={`${className} ${selected === id ? 'is-selected' : ''}`}
        >
          <span role="img" aria-label={id}>
            {text}
          </span>
        </EmojiButtonUI>
      ))}
    </SurveyOptionsUI>
  )
}

MessageCardSurveyThumbs.propTypes = {
  onSelection: PropTypes.func,
  selected: PropTypes.string,
}
