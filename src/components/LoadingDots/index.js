import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  className: PropTypes.string
}

const LoadingDots = props => {
  const { className, ...rest } = props
  const componentClassName = classNames('c-LoadingDots', className)

  return (
    <div className={componentClassName} {...rest}>
      <div className='c-LoadingDots__dot c-LoadingDots__dot--one' />
      <div className='c-LoadingDots__dot c-LoadingDots__dot--two' />
      <div className='c-LoadingDots__dot c-LoadingDots__dot--three' />
    </div>
  )
}

LoadingDots.propTypes = propTypes

export default LoadingDots
