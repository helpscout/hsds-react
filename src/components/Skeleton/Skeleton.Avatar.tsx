import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { AvatarUI } from './Skeleton.Avatar.css'

export interface Props {
  className?: string
  children?: any
  shape: 'square' | 'rounded' | 'circle'
  size: 'lg' | 'md' | 'smmd' | 'sm' | 'xs' | 'xxs' | ''
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
