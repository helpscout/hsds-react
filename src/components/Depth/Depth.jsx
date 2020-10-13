import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { DepthUI } from './Depth.css'

const Depth = ({
  isActive = false,
  children,
  className,
  level = 100,
  withHoverEffect = true,
  ...rest
}) => {
  return (
    <DepthUI
      className={classNames(
        'c-Depth',
        className,
        `d${level}`,
        isActive && 'is-active',
        withHoverEffect && 'with-hover-effect'
      )}
      {...rest}
    >
      {children}
    </DepthUI>
  )
}

Depth.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Control and apply the "hover" styles on other situations, ie. focus */
  isActive: PropTypes.bool,
  /** The Depth level desired */
  level: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700]),
  /** Whether to turn on or off the hover effect */
  withHoverEffect: PropTypes.bool,
}

export default Depth
