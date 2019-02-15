// @flow
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import css from './styles/PopArrow.css.js'

type Props = {
  className?: string,
  children?: any,
  placement: string,
  offset: number,
  size: number,
  theme: Object | string,
  zIndex: number,
}

const ArrowComponent = (props: Props) => {
  const {
    className,
    children,
    placement,
    offset,
    size,
    style,
    theme,
    zIndex,
    ...rest
  } = props

  const position = getPosition(placement)

  const componentClassName = classNames(
    'c-PopArrow',
    placement && `is-${getPlacement(placement)}`,
    position && `is-${position}`,
    className
  )

  const componentStyle = { ...style, zIndex }
  const ghostComponentStyle = { ...style, zIndex: zIndex + 3 }

  return (
    <div>
      <div
        {...getValidProps(rest)}
        className={componentClassName}
        data-x-placement={placement}
        style={componentStyle}
      />
      <div
        {...getValidProps(rest)}
        className={classNames(
          componentClassName,
          'c-PopArrowGhost',
          'is-ghost'
        )}
        data-x-placement={placement}
        style={ghostComponentStyle}
      />
    </div>
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
  placement: 'top',
  size: 5,
  style: {},
  zIndex: 999,
}

export default Arrow
