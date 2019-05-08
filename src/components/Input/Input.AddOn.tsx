import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { AddOnUI } from './styles/Input.AddOn.css'
import { COMPONENT_KEY } from './Input.utils'
import { InputAddOnProps } from './Input.types'

const AddOn = (props: InputAddOnProps) => {
  const { className, children, isFirst, isNotOnly, isLast, ...rest } = props

  const componentClassName = classNames(
    'c-InputAddOn',
    isFirst && 'is-first',
    isNotOnly && 'is-notOnly',
    isLast && 'is-last',
    className
  )

  return (
    <AddOnUI className={componentClassName} {...rest}>
      {children}
    </AddOnUI>
  )
}

AddOn.defaultProps = {
  isFirst: false,
  isNotOnly: false,
  isLast: false,
}

namespaceComponent(COMPONENT_KEY.AddOn)(AddOn)

export default AddOn
