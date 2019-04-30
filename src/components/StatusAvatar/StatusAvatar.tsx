import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { AvatarShape, AvatarSize } from '../Avatar/Avatar.types'
import Avatar from '../Avatar'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './StatusAvatar.utils'

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

namespaceComponent(COMPONENT_KEY)(StatusAvatar)

export default propConnect(COMPONENT_KEY)(StatusAvatar)
