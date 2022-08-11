import React from 'react'
import PropTypes from 'prop-types'

import { ActionUI } from '../MessageCard.styles'

export const MessageCardAction = ({ action }) => {
  return action ? (
    <ActionUI data-cy="beacon-message-cta-wrapper">{action()}</ActionUI>
  ) : null
}

MessageCardAction.propTypes = {
  /** Action to be called */
  action: PropTypes.func,
}
