// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { COMPONENT_KEY } from './utils'

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
class StatusAvatar extends Component<Props> {
  static defaultProps = {
    isOnline: true,
    shape: 'rounded',
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

namespaceComponent(COMPONENT_KEY)(StatusAvatar)

export default StatusAvatar
