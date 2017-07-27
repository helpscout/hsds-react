import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  disableSelect: PropTypes.bool,
  light: PropTypes.bool,
  selector: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.string
}
const defaultProps = {
  disableSelect: false,
  selector: false
}

const Heading = props => {
  const { disableSelect, light, selector, size } = props

  const className = classNames(
    'c-Heading',
    disableSelect && 'is-disableSelect',
    light && 'is-light',
    size && `is-${size}`,
    props.className
  )

  const selectorTag = selector || 'div'

  const element = React.createElement(
    selectorTag,
    {
      ...props,
      className
    },
    props.children
  )

  return element
}

Heading.propTypes = propTypes
Heading.defaultProps = defaultProps

export default Heading
