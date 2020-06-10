import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
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

InputStatic.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', '']),
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isBlock: PropTypes.bool,
  isCenterAlign: PropTypes.bool,
  size: PropTypes.string,
}

InputStatic.defaultProps = {
  'data-cy': 'InputStatic',
  isBlock: false,
  isCenterAlign: false,
  size: 'md',
}

export default InputStatic
