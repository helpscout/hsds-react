import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TextUI } from './Skeleton.Text.css'

class SkeletonText extends React.PureComponent {
  static defaultProps = {
    heading: false,
    style: {},
    width: '70%',
    withAnimations: true,
  }

  render() {
    const {
      className,
      children,
      heading,
      size,
      style,
      width,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SkeletonText',
      heading && 'is-heading',
      size && `is-${size}`,
      className
    )

    const componentStyle = { ...style, width }

    return (
      <TextUI {...rest} className={componentClassName} style={componentStyle} />
    )
  }
}

SkeletonText.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Defines the width of the component. */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Applies heading styles to the component. */
  heading: PropTypes.bool,
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonText
