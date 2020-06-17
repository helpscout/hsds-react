import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
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
      {...getValidProps(rest)}
      className={componentClassName}
      tabIndex={tabIndex}
    >
      {children}
    </VisuallyHiddenUI>
  )
}

VisuallyHidden.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  focusable: PropTypes.bool,
  role: PropTypes.string,
}

VisuallyHidden.defaultProps = {
  focusable: false,
  'data-cy': 'VisuallyHidden',
}

export default VisuallyHidden
