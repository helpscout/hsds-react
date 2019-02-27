import * as React from 'react'
import { ActionButtonUI } from './GreeterCard.css'

export interface Props {
  children?: any
  kind?: string
  isBlock: boolean
  size?: string
}

export default class GreeterCardButton extends React.PureComponent<Props> {
  static defaultProps = {
    'data-cy': 'beacon-greeter-cta',
    kind: 'primary',
    isBlock: true,
    size: 'xl',
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <ActionButtonUI {...rest} version={2}>
        {children}
      </ActionButtonUI>
    )
  }
}
