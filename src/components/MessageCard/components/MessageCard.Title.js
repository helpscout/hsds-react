import React from 'react'
import PropTypes from 'prop-types'

import { getTruncatedText } from '../MessageCard.utils'

import { TitleUI } from '../MessageCard.styles'

export const MessageCardTitle = ({ title }) => {
  return title ? (
    <TitleUI size="h4" data-cy="beacon-message-title">
      {getTruncatedText(title, 110)}
    </TitleUI>
  ) : null
}

MessageCardTitle.propTypes = {
  /** Title of a Message */
  title: PropTypes.string,
}
