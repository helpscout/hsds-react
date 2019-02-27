import * as React from 'react'
import { ActionButtonUI } from './GreeterCard.css'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'

export interface Props {
  children?: any
  onClick?: Function
}

export default class GreeterCardButton extends React.Component<Props> {
  render() {
    const { children, ...rest } = this.props
    return (
      <ActionButtonUI {...getValidProps(rest)} primary block size="lg">
        {children}
      </ActionButtonUI>
    )
  }
}
