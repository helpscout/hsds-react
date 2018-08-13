// @flow
import type { UISize } from '../../constants/types'
import React from 'react'
import classNames from '../../utilities/classNames'
import { setComponentKey } from '../../utilities/component'
import { STATIC_COMPONENT_KEY } from './utils'

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

setComponentKey(Static, STATIC_COMPONENT_KEY)

export default Static
