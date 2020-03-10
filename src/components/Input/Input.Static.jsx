import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { StaticUI } from './Input.Static.css'

const Static = props => {
  const {
    align,
    className,
    children,
    isBlock,
    isCenterAlign,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-InputStatic',
    align && `is-${align}`,
    isBlock && 'is-block',
    isCenterAlign && 'is-centerAlign',
    size && `is-${size}`,
    className
  )

  return (
    <StaticUI className={componentClassName} {...rest}>
      {children}
    </StaticUI>
  )
}
Static.propTypes = {
  /** Determines the alignment of the component. */
  align: PropTypes.oneOf(['left', 'center', 'right', '']),
  className: PropTypes.string,
  isBlock: PropTypes.bool,
  isCenterAlign: PropTypes.bool,
  /** Determines the size of the component. */
  size: PropTypes.oneOf(['xs', 'xssm', 'sm', 'md', 'lg']),
}

Static.defaultProps = {
  isBlock: false,
  isCenterAlign: false,
  size: 'md',
}

Static.displayName = 'InputStatic'

export default Static
