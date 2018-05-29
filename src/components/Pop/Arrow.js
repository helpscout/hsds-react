// @flow
import React from 'react'
import fancy from '@helpscout/fancy'
import classNames from '../../utilities/classNames'
import css from './styles/PopArrow.css'

const ArrowComponent = props => {
  const { className, placement, offset, size, styles, ...rest } = props

  const position = getPosition(placement)

  const componentClassName = classNames(
    styles['c-PopArrow'],
    'c-PopArrow',
    placement && `is-${getPlacement(placement)}`,
    position && `is-${position}`,
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

const getPlacement = (placement: string) => {
  if (!placement) return ''

  return placement.split('-')[0]
}

const getPosition = (placement: string) => {
  if (!placement || placement.indexOf('-') < 0) return ''

  return placement.split('-')[1]
}

const Arrow = fancy(css)(ArrowComponent)

Arrow.defaultProps = {
  offset: 0,
  size: 5,
}

export default Arrow
