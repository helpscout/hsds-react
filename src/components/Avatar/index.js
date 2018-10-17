// @flow
import React, { PureComponent as Component } from 'react'
import { propConnect } from '../PropProvider'
import AvatarV2 from './AvatarV2'
import Avatar from './Avatar'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  version?: number,
}

class WrappedAvatar extends Component<Props> {
  render() {
    const { version, ...rest } = this.props

    return version === 2 ? <AvatarV2 {...rest} /> : <Avatar {...rest} />
  }
}

namespaceComponent(COMPONENT_KEY)(WrappedAvatar)

export default propConnect(COMPONENT_KEY)(WrappedAvatar)
