import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Block from './Flexy.Block'
import Item from './Flexy.Item'
import { classNames } from '../../utilities/classNames'

import { FlexyUI } from './styles/Flexy.css'

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

Flexy.Block = Block
Flexy.Item = Item

Flexy.defaultProps = {
  gap: 'sm',
  baseSize: 4,
}

Flexy.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom', '']),
  baseSize: PropTypes.number,
  gap: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs', 'none', '']),
  just: PropTypes.oneOf(['default', 'left', 'center', 'right', '']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Flexy
