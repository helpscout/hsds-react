import { SubtitleUI } from '../MessageCard.css'
import { getTruncatedText } from '../MessageCard.utils'
import React from 'react'
import PropTypes from 'prop-types'

export const MessageCardSubtitle = ({ subtitle }) => {
  return subtitle ? (
    <SubtitleUI size="h5" weight={500} light data-cy="beacon-message-subtitle">
      {getTruncatedText(subtitle, 110)}
    </SubtitleUI>
  ) : null
}

MessageCardSubtitle.propTypes = {
  /** Subtitle of a Message */
  subtitle: PropTypes.string,
}
