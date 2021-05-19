import { ActionUI } from '../MessageCard.css'
import React from 'react'
import PropTypes from 'prop-types'

export const MessageCardAction = ({ action }) => {
  return action ? (
    <ActionUI data-cy="beacon-message-cta-wrapper">{action()}</ActionUI>
  ) : null
}

MessageCardAction.propTypes = {
  /** Action to be called */
  action: PropTypes.func,
}
