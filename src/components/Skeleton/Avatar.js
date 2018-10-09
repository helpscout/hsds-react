// @flow
import React from 'react'
import Block from './Block'
import { classNames } from '../../utilities/classNames'
import type { AvatarShape, AvatarSize } from '../Avatar/types'

type Props = {
  className?: string,
  children?: any,
  shape: AvatarShape,
  size: AvatarSize,
}

const Avatar = (props: Props) => {
  const { className, children, shape, size, ...rest } = props

  const componentClassName = classNames(
    'c-SkeletonAvatar',
    shape && `is-${shape}`,
    size && `is-${size}`,
    className
  )

  return <Block className={componentClassName} {...rest} />
}

Avatar.defaultProps = {
  size: 'md',
  shape: 'circle',
}

Avatar.displayName = 'Skeleton.Avatar'

export default Avatar
