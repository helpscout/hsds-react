import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { VisuallyHiddenUI } from './VisuallyHidden.css'

type Props = {
  children?: any
  className?: string
  focusable: boolean
  role?: string
}

const VisuallyHidden = (props: Props) => {
  const { children, className, focusable, ...rest } = props

  const componentClassName = classNames(
    'c-VisuallyHidden',
    focusable && 'is-focusable',
    className
  )

  const tabIndex = focusable ? 1 : undefined

  return (
    <VisuallyHiddenUI
      className={componentClassName}
      tabIndex={tabIndex}
      {...rest}
    >
      {children}
    </VisuallyHiddenUI>
  )
}

VisuallyHidden.defaultProps = {
  focusable: false,
}

export default VisuallyHidden
