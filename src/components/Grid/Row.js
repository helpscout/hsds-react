import React from 'react'
import PropTypes from 'prop-types'
import { classNames, variantClassNames } from '../../utilities/classNames'

export const propTypes = {
  flex: PropTypes.bool,
  size: PropTypes.string,
}

const Row = props => {
  const { className, children, flex, size, ...rest } = props

  const namespace = flex ? 'c-Row-flex' : 'c-Row'
  const sizeClassName = size ? variantClassNames(`${namespace}-`, size) : null

  const componentClassName = classNames(namespace, sizeClassName, className)

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Row.propTypes = propTypes

export default Row
