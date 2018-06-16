// @flow
import React from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  className?: string,
  children?: any,
}

const Code = (props: Props) => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-Code', className)

  return (
    <code className={componentClassName} {...rest}>
      {children}
    </code>
  )
}

export default Code
