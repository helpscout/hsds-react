import * as React from 'react'
import { propConnect } from '../PropProvider'
import AvatarStackV2 from './AvatarStackV2'
import AvatarStack from './AvatarStack'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  version?: number
}

class WrappedAvatarStack extends React.PureComponent<Props> {
  render() {
    const { version, ...rest } = this.props

    return version === 2 ? (
      <AvatarStackV2 {...rest} />
    ) : (
      <AvatarStack {...rest} />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(WrappedAvatarStack)

export default propConnect(COMPONENT_KEY)(WrappedAvatarStack)
