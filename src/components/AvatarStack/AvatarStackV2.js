// @flow
import React, { PureComponent as Component } from 'react'
import AvatarStackBase from './AvatarStack'

class AvatarStack extends Component {
  render() {
    return <AvatarStackBase {...this.props} avatarVersion={2} />
  }
}

export default AvatarStack
