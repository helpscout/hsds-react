import * as React from 'react'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

export interface Props {
  className?: string
  children?: any
}

export class Item extends React.PureComponent<Props> {
  static displayName = 'Toolbar.Item'
  static className = 'c-ToolbarItem'

  getClassName() {
    const { className } = this.props

    return classNames(Item.className, className)
  }

  render() {
    const { children, ...rest } = this.props

    if (!children) {
      return null
    }

    return (
      <Flexy.Item {...rest} className={this.getClassName()}>
        {children}
      </Flexy.Item>
    )
  }
}

export default Item
