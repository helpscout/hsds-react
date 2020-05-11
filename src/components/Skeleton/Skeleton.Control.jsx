import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { ControlUI } from './Skeleton.Control.css'

class SkeletonControl extends React.PureComponent {
  static displayName = 'Skeleton.Control'

  static defaultProps = {
    size: 'md',
    withAnimations: true,
  }

  render() {
    const { className, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonControl',
      size && `is-${size}`,
      className
    )

    return <ControlUI {...rest} className={componentClassName} />
  }
}

SkeletonControl.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Size of the control/field. */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonControl
