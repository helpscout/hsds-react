import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { AddOnUI } from './styles/Input.AddOn.css'
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

AddOn.displayName = 'InputAddOn'

export default AddOn
