import React from 'react'
import { classNames } from '../../utilities/classNames.ts'

const Title = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DetailListTitle', className)

  return (
    <dt className={componentClassName} {...rest}>
      {children}
    </dt>
  )
}

Title.displayName = 'DetailListTitle'

export default Title
