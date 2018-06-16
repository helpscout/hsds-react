// @flow
import React from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  className?: string,
  children?: any,
}

const Centralize = (props: Props) => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-Centralize', className)

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

export default Centralize
