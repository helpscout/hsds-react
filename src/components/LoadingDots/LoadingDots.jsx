import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { LoadingDotsUI, LoadingDotUI } from './LoadingDots.css'

const LoadingDots = props => {
  const { align, className, ...rest } = props
  const componentClassName = classNames(
    'c-LoadingDots',
    align && `is-${align}`,
    className
  )

  return (
    <LoadingDotsUI {...getValidProps(rest)} className={componentClassName}>
      <LoadingDotUI className="is-one" />
      <LoadingDotUI className="is-two" />
      <LoadingDotUI className="is-three" />
    </LoadingDotsUI>
  )
}

LoadingDots.defaultProps = {
  'data-cy': 'LoadingDots',
}

LoadingDots.propTypes = {
  /** Determines the horizontal alignment of this component. Accepts `left`, `center`, `right`. */
  align: PropTypes.oneOf(['left', 'center', 'right']),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default LoadingDots
