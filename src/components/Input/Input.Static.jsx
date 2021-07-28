import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { StaticUI } from './Input.Static.css'

const InputStatic = props => {
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
    <StaticUI {...getValidProps(rest)} className={componentClassName}>
      {children}
    </StaticUI>
  )
}

InputStatic.defaultProps = {
  'data-cy': 'InputStatic',
  isBlock: false,
  isCenterAlign: false,
  size: 'md',
}

InputStatic.propTypes = {
  /** Determines the alignment of the component. */
  align: PropTypes.oneOf(['left', 'center', 'right', '']),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Use display: block */
  isBlock: PropTypes.bool,
  /** Use flex and align-items center */
  isCenterAlign: PropTypes.bool,
  /** Determines the size of the component. */
  size: PropTypes.oneOf(['xs', 'xssm', 'sm', 'md', 'lg']),
}

export default InputStatic
