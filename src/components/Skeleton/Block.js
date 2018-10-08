import React from 'react'
import { classNames } from '../../utilities/classNames.ts'

const Block = props => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-SkeletonBlock', className)

  return <div className={componentClassName} {...rest} role="presentation" />
}

Block.displayName = 'SkeletonBlock'

export default Block
