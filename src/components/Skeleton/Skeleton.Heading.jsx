import React from 'react'
import PropTypes from 'prop-types'
import Text from './Skeleton.Text'
import { classNames } from '../../utilities/classNames'

class SkeletonHeading extends React.PureComponent {
  static displayName = 'Skeleton.Heading'

  static defaultProps = {
    style: {},
    width: '70%',
    withAnimations: true,
  }

  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonHeading', className)
    return <Text {...rest} className={componentClassName} heading />
  }
}

SkeletonHeading.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Defines the width of the component. */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonHeading
