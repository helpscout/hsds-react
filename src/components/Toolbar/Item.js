import React, { PureComponent as Component } from 'react'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

class Item extends Component {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ToolbarItem', className)

    return (
      <Flexy.Item className={componentClassName} {...rest}>
        {children}
      </Flexy.Item>
    )
  }
}

Item.displayName = 'ToolbarItem'

export default Item
