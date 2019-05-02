import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'
import { TextUI } from './styles/Skeleton.Text.css'

class Text extends React.PureComponent<any> {
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

namespaceComponent(COMPONENT_KEY.Text)(Text)

export default Text
