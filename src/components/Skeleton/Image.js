import React from 'react'
import Block from './Block'
import { classNames } from '../../utilities/classNames.ts'

const Image = props => {
  const { className, ...rest } = props

  const componentClassName = classNames('c-SkeletonImage', className)

  return <Block className={componentClassName} {...rest} />
}

Image.displayName = 'SkeletonImage'

export default Image
