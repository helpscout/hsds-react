import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Input.utils'
import { StaticUI } from './styles/Input.Static.css'
import { InputStaticProps } from './Input.types'

const Static = (props: InputStaticProps) => {
  const { align, className, children, isCenterAlign, size, ...rest } = props

  const componentClassName = classNames(
    'c-InputStatic',
    align && `is-${align}`,
    isCenterAlign && 'is-centerAlign',
    size && `is-${size}`,
    className
  )

  return (
    <StaticUI className={componentClassName} {...rest}>
      {children}
    </StaticUI>
  )
}

Static.defaultProps = {
  isCenterAlign: false,
  size: 'md',
}

namespaceComponent(COMPONENT_KEY.Static)(Static)

export default Static
