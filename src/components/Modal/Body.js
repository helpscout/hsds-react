import React from 'react'
import classNames from '../../utilities/classNames'

const Body = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ModalBody',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Body.displayName = 'ModalBody'

export default Body
