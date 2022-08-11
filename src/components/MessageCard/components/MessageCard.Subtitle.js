import React from 'react'
import PropTypes from 'prop-types'

import { getTruncatedText } from '../MessageCard.utils'

import { SubtitleUI } from '../MessageCard.styles'

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
