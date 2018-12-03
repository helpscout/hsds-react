import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { TextUI } from './styles/Text.css.js'

class Text extends Component {
  static defaultProps = {
    heading: false,
    size: 'md',
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

namespaceComponent(COMPONENT_KEY.Text)(Text)

export default Text
