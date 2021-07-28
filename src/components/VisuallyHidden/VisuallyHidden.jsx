import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
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
      {...getValidProps(rest)}
      className={componentClassName}
      tabIndex={tabIndex}
    >
      {children}
    </VisuallyHiddenUI>
  )
}

VisuallyHidden.defaultProps = {
  focusable: false,
  'data-cy': 'VisuallyHidden',
}

VisuallyHidden.propTypes = {
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Enables the ability to be tab focused. */
  focusable: PropTypes.bool,
  /** Aria role to assign to the element */
  role: PropTypes.string,
}

export default VisuallyHidden
