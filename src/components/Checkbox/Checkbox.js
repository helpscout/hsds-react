// @flow
import React from 'react'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
}

const Checkbox = (props: Props) => {
  const { className, ...rest } = props

  const componentClassName = classNames('c-Checkbox', className)

  return (
    <Choice
      className={componentClassName}
      componentID="Checkbox"
      type="checkbox"
      {...rest}
    />
  )
}

namespaceComponent(COMPONENT_KEY)(Checkbox)

export default Checkbox
