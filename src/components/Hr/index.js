// @flow
import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
  role: string,
  size: 'md' | 'sm' | 'xs' | 'none',
}

const Hr = (props: Props) => {
  const { className, children, role, size, ...rest } = props
  const componentClassName = classNames('c-Hr', size && `is-${size}`, className)

  return <hr className={componentClassName} {...rest} role={role} />
}

Hr.defaultProps = {
  role: 'separator',
  size: 'md',
}

export default Hr
