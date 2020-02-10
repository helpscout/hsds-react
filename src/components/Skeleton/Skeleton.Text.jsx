import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { TextUI } from './Skeleton.Text.css'

class Text extends React.PureComponent<any> {
  static displayName = 'Skeleton.Text'

  static defaultProps = {
    heading: false,
    withAnimations: false,
    style: {},
    width: '70%',
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

export default Text
