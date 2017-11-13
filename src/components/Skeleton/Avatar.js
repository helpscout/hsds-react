import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import classNames from '../../utilities/classNames'
import { standardSizeTypes } from '../../constants/propTypes'
import { shapeTypes } from '../Avatar/propTypes'

export const propTypes = {
  shape: shapeTypes,
  size: standardSizeTypes
}

const defaultProps = {
  shape: 'circle'
}

const Avatar = props => {
  const {
    className,
    children,
    shape,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-SkeletonAvatar',
    shape && `is-${shape}`,
    size && `is-${size}`,
    className
  )

  return (
    <Block className={componentClassName} {...rest} />
  )
}

Avatar.displayName = 'SkeletonAvatar'

export default Avatar
