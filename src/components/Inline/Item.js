import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'

class Item extends Component {
  render() {
    const { className, children, extendChild, ...rest } = this.props

    const componentClassName = classNames('c-InlineItem', className)

    const child = children ? React.Children.only(children) : null

    const componentMarkup =
      extendChild && child ? (
        React.cloneElement(child, {
          className: classNames(componentClassName, child.props.className),
          ...rest,
        })
      ) : (
        <div className={componentClassName} {...rest} role="listitem">
          {children}
        </div>
      )

    return componentMarkup
  }
}

Item.displayName = 'InlineItem'

export default Item
