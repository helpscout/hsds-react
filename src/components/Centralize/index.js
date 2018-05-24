import React from 'react'
import classNames from '../../utilities/classNames'

const Centralize = props => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-Centralize', className)

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Centralize.displayName = 'Centralize'

export default Centralize
