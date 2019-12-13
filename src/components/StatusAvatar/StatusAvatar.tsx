import * as React from 'react'
import { AvatarShape, AvatarSize } from '../Avatar/Avatar.types'
import Avatar from '../Avatar'
import { classNames } from '../../utilities/classNames'

type Props = {
  className?: string
  isOnline: boolean
  shape: AvatarShape
  size: AvatarSize
}

/**
 * A enhanced wrapper that for Avatar, allowing for an easier way to indicate
 * Avatar state.
 */
class StatusAvatar extends React.PureComponent<Props> {
  static defaultProps = {
    isOnline: true,
    shape: 'circle',
    size: 'smmd',
  }

  render() {
    const { className, isOnline, ...rest } = this.props

    const componentClassName = classNames(
      'c-StatusAvatar',
      isOnline ? 'is-online' : 'is-offline',
      className
    )

    const status = isOnline ? 'online' : 'offline'
    const statusIcon = isOnline ? 'tick-small' : 'cross-small'

    return (
      <Avatar
        {...rest}
        className={componentClassName}
        status={status}
        statusIcon={statusIcon}
      />
    )
  }
}

export default StatusAvatar
