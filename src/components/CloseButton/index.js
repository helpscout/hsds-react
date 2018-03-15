import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { sizeTypes } from './propTypes'

export const propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  seamless: PropTypes.bool,
  size: sizeTypes,
  title: PropTypes.string
}

const defaultProps = {
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  title: 'Close'
}

const CloseButton = props => {
  const {
    className,
    seamless,
    size,
    title,
    ...rest
  } = props

  const isTiny = size === 'tiny'

  const componentClassName = classNames(
    'c-CloseButton',
    seamless && 'is-seamless',
    size && `is-${size}`,
    className
  )

  const iconName = !isTiny ? 'cross-large' : 'cross-small'

  return (
    <button className={componentClassName} {...rest} aria-label='Close' title={title}>
      <Icon
        center
        className='c-CloseButton__icon'
        ignoreClick
        name={iconName}
        title='Close'
      />
    </button>
  )
}

CloseButton.propTypes = propTypes
CloseButton.defaultProps = defaultProps
CloseButton.displayName = 'CloseButton'

export default CloseButton
