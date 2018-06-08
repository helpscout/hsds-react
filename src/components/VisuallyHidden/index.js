// @flow
import React from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
  focusable: boolean,
}

const VisuallyHidden = (props: Props) => {
  const { children, className, focusable, ...rest } = props

  const componentClassName = classNames(
    'c-VisuallyHidden',
    focusable && 'is-focusable',
    className
  )

  const tabIndex = focusable ? 1 : null

  return (
    <span className={componentClassName} tabIndex={tabIndex} {...rest}>
      {children}
    </span>
  )
}

VisuallyHidden.defaultProps = {
  focusable: false,
}

export default VisuallyHidden
