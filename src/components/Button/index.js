// @flow
import React, { PureComponent as Component } from 'react'
import { propConnect } from '../PropProvider'
import ButtonV2 from './ButtonV2'
import Button from './Button'

type Props = {
  version?: number,
}

class WrappedButton extends Component<Props> {
  render() {
    const { version, ...rest } = this.props

    return version === 2 ? <ButtonV2 {...rest} /> : <Button {...rest} />
  }
}

export default propConnect('Button')(WrappedButton)
