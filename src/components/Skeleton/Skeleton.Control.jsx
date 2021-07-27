import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ControlUI } from './Skeleton.Control.css'

class SkeletonControl extends React.PureComponent {
  render() {
    const { className, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonControl',
      size && `is-${size}`,
      className
    )

    return <ControlUI {...getValidProps(rest)} className={componentClassName} />
  }
}

SkeletonControl.defaultProps = {
  'data-cy': 'SkeletonControl',
  size: 'md',
  withAnimations: true,
}

SkeletonControl.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Size of the control/field. */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonControl
