import * as React from 'react'
import { AvatarShape, AvatarSize } from '../Avatar/Avatar.types'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'
import { AvatarUI } from './styles/Skeleton.Avatar.css'

export interface Props {
  className?: string
  children?: any
  shape: AvatarShape
  size: AvatarSize
}

class Avatar extends React.PureComponent<Props> {
  static defaultProps = {
    size: 'md',
    shape: 'circle',
  }

  render() {
    const { className, children, shape, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonAvatar',
      shape && `is-${shape}`,
      size && `is-${size}`,
      className
    )

    return <AvatarUI {...rest} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Avatar)(Avatar)

export default Avatar
