import * as React from 'react'
import { propConnect } from '../PropProvider'
import ButtonV2 from './ButtonV2'
import Button from './Button'
import { COMPONENT_KEY } from './Button.utils'

export interface Props {
  version?: number
}

class WrappedButton extends React.PureComponent<Props> {
  render() {
    const { version, ...rest } = this.props

    return version === 2 ? <ButtonV2 {...rest} /> : <Button {...rest} />
  }
}

export default propConnect(COMPONENT_KEY)(WrappedButton)
