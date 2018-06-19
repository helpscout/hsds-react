// @flow
import React from 'react'
import classNames from '../../utilities/classNames'
import type { UISize } from '../../constants/types'

type Props = {
  align: 'left' | 'center' | 'right' | '',
  children?: any,
  className?: string,
  size: UISize,
}

const Static = (props: Props) => {
  const { align, className, children, size, ...rest } = props

  const componentClassName = classNames(
    'c-InputStatic',
    align && 'is-block',
    align && `is-${align}`,
    size && `is-${size}`,
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

export default Static
