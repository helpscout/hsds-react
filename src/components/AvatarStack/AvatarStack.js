// @flow
import React, { PureComponent as Component } from 'react'
import AvatarStackV2 from './AvatarStackV2'

class AvatarStack extends Component {
  render() {
    return <AvatarStackV2 {...this.props} avatarVersion={1} />
  }
}

export default AvatarStack
