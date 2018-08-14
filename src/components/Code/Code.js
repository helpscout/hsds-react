// @flow
import React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { CodeUI } from './styles/Code.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  children?: any,
}

const Code = (props: Props) => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-Code', className)

  return (
    <CodeUI className={componentClassName} {...rest}>
      {children}
    </CodeUI>
  )
}

namespaceComponent(COMPONENT_KEY)(Code)

export default Code
