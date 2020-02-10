import React from 'react'
import PropTypes from 'prop-types'
import { AvatarShape, AvatarSize } from '../Avatar/Avatar.types'
import { classNames } from '../../utilities/classNames'
import { AvatarUI } from './Skeleton.Avatar.css'

export interface Props {
  className?: string
  children?: any
  shape: AvatarShape
  size: AvatarSize
}

class Avatar extends React.PureComponent<Props> {
  static displayName = 'Skeleton.Avatar'
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

export default Avatar
