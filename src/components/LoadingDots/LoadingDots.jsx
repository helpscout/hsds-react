import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { LoadingDotsUI, LoadingDotUI } from './LoadingDots.css'

const LoadingDots = props => {
  const { align, className, ...rest } = props
  const componentClassName = classNames(
    'c-LoadingDots',
    align && `is-${align}`,
    className
  )

  return (
    <LoadingDotsUI className={componentClassName} {...rest}>
      <LoadingDotUI className="is-one" />
      <LoadingDotUI className="is-two" />
      <LoadingDotUI className="is-three" />
    </LoadingDotsUI>
  )
}
LoadingDots.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', '']),
  className: string,
}

export default LoadingDots
