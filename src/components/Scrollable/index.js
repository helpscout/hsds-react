import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  fade: PropTypes.bool,
  rounded: PropTypes.bool
}

const Scrollable = props => {
  const {
    children,
    fade,
    rounded
  } = props

  const className = classNames(
    'c-Scrollable',
    fade && 'has-fade',
    rounded && 'is-rounded',
    props.className
  )

  const fadeMarkup = fade ? (
    <div className='c-Scrollable__fade' />
  ) : null

  return (
    <div className={className}>
      {fadeMarkup}
      <div className='c-Scrollable__content'>
        {children}
      </div>
    </div>
  )
}

Scrollable.propTypes = propTypes

export default Scrollable
