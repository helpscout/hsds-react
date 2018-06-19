// @flow
import React from 'react'
import Avatar from '../Avatar'
import classNames from '../../utilities/classNames'
import type { AvatarShape, AvatarSize } from '../Avatar/types'

type Props = {
  className?: string,
  isOnline: boolean,
  shape: AvatarShape,
  size: AvatarSize,
}

/**
 * A enhanced wrapper that for Avatar, allowing for an easier way to indicate
 * Avatar state.
 */
const StatusAvatar = (props: Props) => {
  const { className, isOnline, ...rest } = props

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

StatusAvatar.defaultProps = {
  isOnline: true,
  shape: 'rounded',
  size: 'smmd',
}

export default StatusAvatar
