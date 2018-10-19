// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { AvatarUI } from './styles/Avatar.css.js'

export interface Props {
  className?: string;
  children?: any;
  shape: AvatarShape;
  size: AvatarSize;
}

class Avatar extends Component<Props> {
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
