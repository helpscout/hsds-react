import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  className: PropTypes.string,
  fade: PropTypes.bool,
  rounded: PropTypes.bool
}

const Scrollable = props => {
  const {
    children,
    className,
    fade,
    rounded,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Scrollable',
    fade && 'has-fade',
    rounded && 'is-rounded',
    className
  )

  const fadeMarkup = fade ? (
    <div className='c-Scrollable__fade' />
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      {fadeMarkup}
      <div className='c-Scrollable__content'>
        {children}
      </div>
    </div>
  )
}

Scrollable.propTypes = propTypes

export default Scrollable
