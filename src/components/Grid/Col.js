import React from 'react'
import PropTypes from 'prop-types'
import { classNames, variantClassNames } from '../../utilities/classNames'

export const propTypes = {
  size: PropTypes.string,
}

const Col = props => {
  const { className, children, size, ...rest } = props

  const sizeClassName = size ? variantClassNames('c-Col', size) : null

  const componentClassName = classNames('c-Col', sizeClassName, className)

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Col.propTypes = propTypes

export default Col
