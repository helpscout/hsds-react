import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ImageUI } from './Skeleton.Image.css'

class SkeletonImage extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-SkeletonImage', className)

    return <ImageUI {...getValidProps(rest)} className={componentClassName} />
  }
}

SkeletonImage.defaultProps = {
  'data-cy': 'SkeletonImage',
  withAnimations: true,
}

SkeletonImage.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonImage
