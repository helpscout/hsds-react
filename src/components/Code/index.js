import React from 'react'
import classNames from '../../utilities/classNames'

const Code = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Code',
    className
  )

  return (
    <code className={componentClassName} {...rest}>
      {children}
    </code>
  )
}

export default Code
