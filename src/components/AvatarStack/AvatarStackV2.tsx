import * as React from 'react'
import AvatarStackBase from './AvatarStack'

export class AvatarStack extends React.PureComponent {
  render() {
    return <AvatarStackBase {...this.props} avatarVersion={2} version={2} />
  }
}

export default AvatarStack
