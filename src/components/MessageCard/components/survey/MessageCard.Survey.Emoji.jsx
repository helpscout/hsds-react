import PropTypes from 'prop-types'

import {
  EmojiButtonUI,
  ImageEmojiUI,
  SurveyOptionsUI,
} from './MessageCard.Survey.css'

import { useButtonResizeOnSelection } from '../../utils/MessageCard.hooks'
import { useSurveyContext } from '../../utils/MessageCard.Survey.context'

const EMOJI_CDN_BASE_PATH =
  'https://beacon-v2.helpscout.net/static/img-apple-64'

export const MessageCardSurveyEmoji = ({ emojis = [] }) => {
  const { onSelection, selected, withFeedbackForm } = useSurveyContext()
  const { buttonSize, handleOnClick } = useButtonResizeOnSelection({
    disableTransition: !withFeedbackForm,
    onSelection,
  })

  const className = `is-${buttonSize}`

  return (
    <SurveyOptionsUI>
      {emojis.map(({ id, name, unicode, native }) => (
        <EmojiButtonUI
          key={id}
          onClick={() => handleOnClick(id)}
          className={`${className} ${selected === id ? 'is-selected' : ''}`}
        >
          {native ? (
            <span aria-label={name} role="img">
              {native}
            </span>
          ) : (
            <ImageEmojiUI
              alt={name}
              src={`${EMOJI_CDN_BASE_PATH}/${unicode}.png`}
              className={className}
            />
          )}
        </EmojiButtonUI>
      ))}
    </SurveyOptionsUI>
  )
}

MessageCardSurveyEmoji.propTypes = {
  emojis: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      unicode: PropTypes.string.isRequired,
      native: PropTypes.string,
    })
  ).isRequired,
}
