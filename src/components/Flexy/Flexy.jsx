import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import FlexyBlock from './Flexy.Block'
import FlexyItem from './Flexy.Item'
import classNames from 'classnames'
import { FlexyUI } from './Flexy.css'

export const FlexyClassName = 'c-Flexy'
export const FlexyContext = React.createContext()

export const Flexy = props => {
  const contextValue = useContext(FlexyContext)
  const newProps = { ...props, contextValue }
  const {
    align,
    baseSize,
    children,
    className,
    gap,
    just,
    innerRef,
    ...rest
  } = newProps

  const componentClassName = classNames(
    FlexyClassName,
    align && `is-align-${align} is-${align}`,
    gap && `is-gap-${gap}`,
    just && `is-just-${just}`,
    className
  )

  return (
    <FlexyUI
      {...getValidProps(rest)}
      baseSize={baseSize}
      className={componentClassName}
      ref={innerRef}
    >
      {children}
    </FlexyUI>
  )
}

Flexy.Block = FlexyBlock
Flexy.Item = FlexyItem

Flexy.defaultProps = {
  gap: 'sm',
  baseSize: 4,
  'data-cy': 'Flexy',
}

Flexy.propTypes = {
  /** Determines the vertical alignment of Flexy child elements. */
  align: PropTypes.oneOf(['top', 'middle', 'bottom', '']),
  /** Determines the gap (base) size between child elements. */
  baseSize: PropTypes.number,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines the amount of spacing between Flexy child elements. */
  gap: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs', 'none', '']),
  /** Determines the horizontal alignment of Flexy child elements. */
  just: PropTypes.oneOf(['default', 'left', 'center', 'right', '']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Flexy
