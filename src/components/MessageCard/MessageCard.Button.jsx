import React from 'react'
import PropTypes from 'prop-types'
import { ActionButtonUI } from './MessageCard.css'
import { noop } from '../../utilities/other'
import Truncate from '../Truncate'

export class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    kind: PropTypes.string,
    isBlock: PropTypes.bool,
    size: PropTypes.string,
  }

  static defaultProps = {
    'data-cy': 'beacon-message-cta',
    kind: 'primary',
    onClick: noop,
    isBlock: true,
    size: 'xl',
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <ActionButtonUI {...rest}>
        <Truncate>{children}</Truncate>
      </ActionButtonUI>
    )
  }
}

export default Button
