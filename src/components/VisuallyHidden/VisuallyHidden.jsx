import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { VisuallyHiddenUI } from './VisuallyHidden.css'

const VisuallyHidden = props => {
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
VisuallyHidden.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  focusable: PropTypes.bool,
  role: PropTypes.string,
}

export default VisuallyHidden
