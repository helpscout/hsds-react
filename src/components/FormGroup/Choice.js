import React from 'react'
import classNames from '../../utilities/classNames'

const Choice = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-FormGroupChoice',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

export default Choice
