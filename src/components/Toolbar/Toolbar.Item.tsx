import * as React from 'react'
import Flexy from '../Flexy'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { ITEM_COMPONENT_KEY } from './Toolbar.utils'

export interface Props {
  className?: string
  children?: any
}

class Item extends React.PureComponent<Props> {
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

const PropConnectedComponent = propConnect(ITEM_COMPONENT_KEY)(Item)

export default PropConnectedComponent
