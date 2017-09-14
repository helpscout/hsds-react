import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { sizeTypes } from './propTypes'

export const propTypes = {
  className: PropTypes.string,
  disableSelect: PropTypes.bool,
  light: PropTypes.bool,
  lineHeightReset: PropTypes.bool,
  selector: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: sizeTypes
}

const defaultProps = {
  disableSelect: false,
  selector: false
}

const Heading = props => {
  const {
    children,
    className,
    disableSelect,
    light,
    lineHeightReset,
    selector,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Heading',
    disableSelect && 'is-disableSelect',
    light && 'is-light',
    lineHeightReset && 'is-line-height-reset',
    size && `is-${size}`,
    className
  )

  const selectorTag = selector || 'div'

  const element = React.createElement(
    selectorTag,
    {
      ...rest,
      className: componentClassName
    },
    children
  )

  return element
}

Heading.propTypes = propTypes
Heading.defaultProps = defaultProps

export default Heading
