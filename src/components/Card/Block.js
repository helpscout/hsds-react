import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  className: PropTypes.string,
  size: standardSizeTypes
}

const Block = props => {
  const { className, children, size, ...rest } = props

  const componentClassName = classNames(
    'c-card__block',
    size && `c-card__block--${size}`,
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Block.propTypes = propTypes

export default Block
