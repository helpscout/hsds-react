import React from 'react'
import PropTypes from 'prop-types'
import { ActionButtonUI } from './MessageCard.css'
import Truncate from '../Truncate'

export class MessageCardButton extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props

    return (
      <ActionButtonUI theme="blue" {...rest}>
        <Truncate>{children}</Truncate>
      </ActionButtonUI>
    )
  }
}

function noop() {}

MessageCardButton.defaultProps = {
  'data-cy': 'beacon-message-cta',
  onClick: noop,
  size: 'xxl',
}

MessageCardButton.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
}

export default MessageCardButton
