import React from 'react'
import PropTypes from 'prop-types'
import { EmojiButtonUI, SurveyOptionsUI } from './MessageCard.Survey.css'

const buttons = [
  { id: 'yes', text: '👍' },
  { id: 'no', text: '👎' },
]

export const MessageCardSurveyThumbs = ({
  onSelection = () => {},
  selected = null,
}) => {
  function handleClick(id) {
    onSelection(id)
  }

  return (
    <SurveyOptionsUI>
      {buttons.map(({ id, text }) => (
        <EmojiButtonUI
          key={id}
          onClick={() => handleClick(id)}
          selected={selected === id}
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
