import * as React from 'react'
import BaseAvatar from './Avatar'

export interface Props {
  withBorder: boolean
}

export class Avatar extends React.PureComponent<Props> {
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
