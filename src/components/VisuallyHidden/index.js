import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  focusable: PropTypes.bool
}

const defaultProps = {
  focusable: false
}

const VisuallyHidden = props => {
  const { focusable } = props

  const className = classNames(
    'c-VisuallyHidden',
    focusable && 'is-focusable',
    props.className
  )

  const tabIndex = focusable ? 1 : null

  return (
    <span className={className} tabIndex={tabIndex}>
      {props.children}
    </span>
  )
}

VisuallyHidden.propTypes = propTypes
VisuallyHidden.defaultProps = defaultProps

export default VisuallyHidden
