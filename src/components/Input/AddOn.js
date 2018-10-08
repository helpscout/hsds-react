// @flow
import React from 'react'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { AddOnUI } from './styles/AddOn.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
}

const AddOn = (props: Props) => {
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
