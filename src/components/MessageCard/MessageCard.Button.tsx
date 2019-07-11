import * as React from 'react'
import { ActionButtonUI } from './styles/MessageCard.css'
import { noop } from '../../utilities/other'
import Truncate from '../Truncate'

export interface Props {
  children?: any
  onClick: (event: any) => void
  kind?: string
  isBlock: boolean
  size?: string
}

export class Button extends React.PureComponent<Props> {
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
      <ActionButtonUI {...rest} version={2}>
        <Truncate>{children}</Truncate>
      </ActionButtonUI>
    )
  }
}

export default Button
