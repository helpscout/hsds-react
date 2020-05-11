import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { ImageUI } from './Skeleton.Image.css'

class SkeletonImage extends React.PureComponent {
  static displayName = 'Skeleton.Image'

  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonImage', className)

    return <ImageUI {...rest} className={componentClassName} />
  }
}

SkeletonImage.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonImage
