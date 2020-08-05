import React from 'react'
import PropTypes from 'prop-types'
import { ActionButtonUI } from './MessageCard.css'
import { noop } from '../../utilities/other'
import Truncate from '../Truncate'

export class MessageCardButton extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props

    return (
      <ActionButtonUI {...rest}>
        <Truncate>{children}</Truncate>
      </ActionButtonUI>
    )
  }
}

MessageCardButton.defaultProps = {
  'data-cy': 'beacon-message-cta',
  kind: 'primary',
  onClick: noop,
  isBlock: true,
  size: 'xl',
}

MessageCardButton.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  kind: PropTypes.string,
  isBlock: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
}

export default MessageCardButton
