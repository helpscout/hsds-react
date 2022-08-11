import React from 'react'
import { EmojiButtonUI, SurveyOptionsUI } from './MessageCard.Survey.styles'

import { useButtonResizeOnSelection } from '../../utils/MessageCard.hooks'
import { useSurveyContext } from '../../utils/MessageCard.Survey.context'

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
