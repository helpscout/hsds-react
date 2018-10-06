import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames.ts'

export const propTypes = {
  fluid: PropTypes.bool,
  responsive: PropTypes.bool,
}

const Container = props => {
  const { className, children, fluid, responsive, ...rest } = props

  const componentClassName = classNames(
    'c-Container',
    fluid && 'c-Container--fluid',
    responsive && 'c-Container--responsive',
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
