import React from 'react'
import classNames from '../../utilities/classNames'
import Choice from './Choice'
import Grid from './Grid'

const FormGroup = props => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-FormGroup', className)

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

FormGroup.Choice = Choice
FormGroup.Grid = Grid

export default FormGroup
