import React from 'react'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import css from './styles/PopArrow.css'

const ArrowComponent = props => {
  const {
    className,
    children,
    placement,
    offset,
    size,
    styles,
    theme,
    ...rest
  } = props

  const position = getPosition(placement)

  const componentClassName = classNames(
    styles.PopArrow,
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

/**
 * Gets the top|right|bottom|left label from a Popper placement
 *
 * @param   {string} placement
 * @returns {string}
 */
export const getPlacement = (placement: string) => {
  if (!placement) return ''

  return placement.split('-')[0]
}

/**
 * Gets the start|end label from a Popper placement
 *
 * @param   {string} placement
 * @returns {string}
 */
export const getPosition = (placement: string) => {
  if (!placement || placement.indexOf('-') < 0) return ''

  return placement.split('-')[1]
}

const Arrow = styled(ArrowComponent)(css)

Arrow.defaultProps = {
  offset: 0,
  size: 5,
}

export default Arrow
