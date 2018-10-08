import React from 'react'
import Block from './Block'
import { classNames } from '../../utilities/classNames.ts'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  sizes: standardSizeTypes,
}

const defaultProps = {
  size: 'md',
}

const Control = props => {
  const { className, size, ...rest } = props

  const componentClassName = classNames(
    'c-SkeletonControl',
    size && `is-${size}`,
    className
  )

  return <Block className={componentClassName} {...rest} />
}

Control.propTypes = propTypes
Control.defaultProps = defaultProps
Control.displayName = 'SkeletonControl'

export default Control
