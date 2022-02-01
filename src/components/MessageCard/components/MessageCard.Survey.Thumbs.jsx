import React from 'react'
import PropTypes from 'prop-types'
import { SurveyContext } from '../MessageCard.Survey.context'
import { EmojiButtonUI, SurveyOptionsUI } from './MessageCard.Survey.css'

const buttons = [
  { id: 'thumbs-up', text: '👍' },
  { id: 'thumbs-down', text: '👎' },
]

export const MessageCardSurveyThumbs = () => {
  const { onSelection = () => {}, selected = null } = React.useContext(
    SurveyContext
  )

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
