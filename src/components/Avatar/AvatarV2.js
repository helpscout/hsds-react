import React, { PureComponent as Component } from 'react'
import BaseAvatar from './Avatar'

export interface Props {
  withBorder: boolean;
}

class Avatar extends Component<Props> {
  static defaultProps = {
    withBorder: true,
  }

  getAvatarProps = () => {
    const { withBorder, ...rest } = this.props
    const borderColor = withBorder ? 'white' : null
    const withShadow = !!withBorder

    return {
      ...rest,
      borderColor,
      withShadow,
      showStatusBorderColor: true,
    }
  }

  render() {
    return <BaseAvatar {...this.getAvatarProps()} />
  }
}

export default Avatar
