import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ActionButtonUI } from './MessageCard.css'
import { noop } from '../../utilities/other'
import Truncate from '../Truncate'

export class MessageButton extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props

    return (
      <ActionButtonUI {...getValidProps(rest)}>
        <Truncate>{children}</Truncate>
      </ActionButtonUI>
    )
  }
}

MessageButton.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  kind: PropTypes.string,
  isBlock: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
}

MessageButton.defaultProps = {
  'data-cy': 'beacon-message-cta',
  kind: 'primary',
  onClick: noop,
  isBlock: true,
  size: 'xl',
}

export default MessageButton
