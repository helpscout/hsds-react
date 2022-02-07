import React from 'react'
import PropTypes from 'prop-types'
import { EmojiButtonUI, SurveyOptionsUI } from './MessageCard.Survey.css'
import { useSurveyContext } from '../MessageCard.Survey.context'

const buttons = [
  { id: 'thumbs-up', text: '👍' },
  { id: 'thumbs-down', text: '👎' },
]

export const MessageCardSurveyThumbs = () => {
  const { onSelection, selected } = useSurveyContext()

  return (
    <SurveyOptionsUI>
      {buttons.map(({ id, text }) => (
        <EmojiButtonUI
          key={id}
          onClick={() => onSelection(id)}
          className={selected === id ? 'is-selected' : ''}
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
