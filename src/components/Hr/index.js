import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  role: PropTypes.string,
  size: PropTypes.oneOf(['md', 'sm', 'xs', 'none']),
}
const defaultProps = {
  role: 'separator',
  size: 'md',
}

const Hr = props => {
  const { className, role, size, ...rest } = props
  const componentClassName = classNames('c-Hr', size && `is-${size}`, className)

  return <hr className={componentClassName} {...rest} role={role} />
}

Hr.propTypes = propTypes
Hr.defaultProps = defaultProps

export default Hr
