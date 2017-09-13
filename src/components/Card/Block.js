import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Scrollable from '../Scrollable'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  bgMuted: PropTypes.bool,
  className: PropTypes.string,
  scrollable: PropTypes.bool,
  flex: PropTypes.bool,
  size: standardSizeTypes
}

const Block = props => {
  const {
    bgMuted,
    className,
    children,
    scrollable,
    flex,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-card__block',
    bgMuted && 'is-bg-muted',
    flex && 'is-flex',
    scrollable && 'is-scrollable',
    size && `c-card__block--${size}`,
    className
  )

  const scrollableClassName = classNames(
    'c-card__block',
    'c-card__block--scrollable',
    flex && 'is-flex',
    scrollable && 'is-scrollable'
  )

  const blockMarkup = scrollable ? (
    <Scrollable className={scrollableClassName}>
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    </Scrollable>
  ) : (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )

  return blockMarkup
}

Block.propTypes = propTypes

export default Block
