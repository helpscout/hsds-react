import React from 'react'
import Choice from '../Choice'
import classNames from '../../utilities/classNames'

const Checkbox = props => {
  const {
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Checkbox',
    className
  )

  return (
    <Choice className={componentClassName} componentID='Checkbox' type='checkbox' {...rest} />
  )
}

export default Checkbox
