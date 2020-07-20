import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from './Skeleton.Text'
import { classNames } from '../../utilities/classNames'

class SkeletonHeading extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-SkeletonHeading', className)

    return (
      <Text {...getValidProps(rest)} className={componentClassName} heading />
    )
  }
}

SkeletonHeading.defaultProps = {
  'data-cy': 'SkeletonHeading',
  style: {},
  width: '70%',
  withAnimations: true,
}

SkeletonHeading.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Defines the width of the component. */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonHeading
