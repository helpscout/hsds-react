import React from 'react'
import Choice from '../Choice'
import classNames from '../../utilities/classNames'

const Radio = props => {
  const {
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Radio',
    className
  )

  return (
    <Choice className={componentClassName} componentID='Radio' type='radio' {...rest} />
  )
}

export default Radio
