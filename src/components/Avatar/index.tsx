import * as React from 'react'
import AvatarV2 from './AvatarV2'
import Avatar from './Avatar'

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

export default WrappedAvatar
