import React from 'react'
import classNames from '../../utilities/classNames'

const Item = props => {
  const {
    children,
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'o-flexy__item',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

export default Item
