import * as React from 'react'
import { propConnect } from '../PropProvider'
import AvatarV2 from './AvatarV2'
import Avatar from './Avatar'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Avatar.utils'

export interface Props {
  version: number
}

class WrappedAvatar extends React.PureComponent<Props> {
  static defaultProps = {
    version: 1,
  }

  render() {
    const { version, ...rest } = this.props

    return version === 2 ? <AvatarV2 {...rest} /> : <Avatar {...rest} />
  }
}

namespaceComponent(COMPONENT_KEY)(WrappedAvatar)

export default propConnect(COMPONENT_KEY)(WrappedAvatar)
