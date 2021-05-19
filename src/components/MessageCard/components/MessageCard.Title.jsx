import { TitleUI } from '../MessageCard.css'
import { getTruncatedText } from '../MessageCard.utils'
import React from 'react'
import PropTypes from 'prop-types'

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
