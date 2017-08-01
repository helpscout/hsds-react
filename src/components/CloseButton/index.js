import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/constants'

const propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
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
    title,
    ...rest
  } = props

  const buttonClassName = classNames(
    'c-CloseButton',
    className
  )

  return (
    <button className={buttonClassName} {...rest} aria-label='Close' title={title}>
      <Icon
        center
        className='c-CloseButton__icon'
        ignoreClick
        muted
        name='cross-medium'
        title='Close'
      />
    </button>
  )
}

CloseButton.propTypes = propTypes
CloseButton.defaultProps = defaultProps

export default CloseButton
