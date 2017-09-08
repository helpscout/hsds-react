import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  className: PropTypes.string,
  size: standardSizeTypes
}

const CardBlock = props => {
  const { size, ...rest } = props

  const className = classNames(
    'c-card__block',
    size && `c-card__block--${size}`,
    props.className
  )

  return (
    <div className={className} {...rest}>
      {props.children}
    </div>
  )
}

CardBlock.propTypes = propTypes

export default CardBlock
