import React from 'react'
import classNames from '../../utilities/classNames'

const Divider = props => {
  const {
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-DropdownDivider',
    className
  )

  return (
    <div className={componentClassName} {...rest} />
  )
}

export default Divider
