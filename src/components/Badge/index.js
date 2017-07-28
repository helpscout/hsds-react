import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  status: PropTypes.string,
  white: PropTypes.bool
}

const Badge = props => {
  const { size, status, white } = props
  const className = classNames(
    'c-Badge',
    size && `is-${size}`,
    status && `is-${status}`,
    white && 'is-white',
    props.className
  )

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

Badge.propTypes = propTypes

export default Badge
