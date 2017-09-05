import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  fluid: PropTypes.bool,
  responsive: PropTypes.bool
}

const Container = props => {
  const {
    className,
    children,
    fluid,
    responsive,
    ...rest
  } = props

  const componentClassName = classNames(
    'o-container',
    fluid && 'o-container--fluid',
    responsive && 'o-container--responsive',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Container.propTypes = propTypes

export default Container
