import React from 'react'
import fancy from '@helpscout/fancy'
import classNames from '../../utilities/classNames'
import css from './styles/PopArrow.css'

const ArrowComponent = props => {
  const { className, placement, offset, size, styles, ...rest } = props

  const componentClassName = classNames(
    styles['c-PopArrow'],
    'c-PopArrow',
    placement && `is-${placement}`,
    className
  )

  return (
    <div
      className={componentClassName}
      data-x-placement={placement}
      {...rest}
    />
  )
}

const Arrow = fancy(css)(ArrowComponent)

Arrow.defaultProps = {
  offset: 0,
  size: 5,
}

export default Arrow
