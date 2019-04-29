import * as React from 'react'
import { UISize } from '../../constants/types'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Input.utils'
import { StaticUI } from './styles/Input.Static.css'

type Props = {
  align: 'left' | 'center' | 'right' | ''
  children?: any
  className?: string
  size: UISize
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
