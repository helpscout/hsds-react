import React from 'react'
import Flexy from '../Flexy'
import classNames from '../../utilities/classNames'

const Block = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ToolbarBlock',
    className
  )

  return (
    <Flexy.Block className={componentClassName} {...rest}>
      {children}
    </Flexy.Block>
  )
}

Block.displayName = 'ToolbarBlock'

export default Block
