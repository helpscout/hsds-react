// @flow
import type { UISize } from '../../constants/types'
import React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { StaticUI } from './Static.css'

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
    <StaticUI className={componentClassName} {...rest}>
      {children}
    </StaticUI>
  )
}

namespaceComponent(COMPONENT_KEY.Static)(Static)

export default Static
