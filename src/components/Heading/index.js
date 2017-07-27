import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  disableSelect: PropTypes.bool,
  light: PropTypes.bool,
  selector: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
}
const defaultProps = {
  className: '',
  disableSelect: false,
  light: false,
  selector: false,
  size: false
}

const Heading = props => {
  const { disableSelect, light, selector, size } = props

  const className = classNames(
    'c-Heading',
    disableSelect && 'is-disable-select',
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
