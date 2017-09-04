import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  className: PropTypes.string,
  size: PropTypes.string
}

const CardBlock = props => {
  const { size, ...rest } = props

  const className = classNames(
    'c-CardBlock',
    size && `c-CardBlock--${size}`,
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
