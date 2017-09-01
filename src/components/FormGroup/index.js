import React from 'react'
import classNames from '../../utilities/classNames'
import Choice from './Choice'

const FormGroup = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-FormGroup',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

FormGroup.Choice = Choice

export default FormGroup
