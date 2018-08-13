// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { isComponentKey, setComponentKey } from '../../utilities/component'
import Block from './Block'
import Item from './Item'
import { ControlGroupUI } from './styles/ControlGroup.css.js'
import { COMPONENT_KEY, ITEM_COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  children?: any,
}

class ControlGroup extends Component<Props> {
  static Block = Block
  static Item = Item

  getChildrenMarkup = () => {
    const { children } = this.props

    if (!children) return null

    return React.Children.map(children, (child, index) => {
      if (!isComponentKey(child, ITEM_COMPONENT_KEY)) return child

      return React.cloneElement(child, {
        isFirst: index === 0 && children.length > 1,
        isNotOnly: index > 0 && index < children.length - 1,
        isLast: index !== 0 && index === children.length - 1,
      })
    })
  }

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-ControlGroup', className)

    const childrenMarkup = this.getChildrenMarkup()

    return (
      <ControlGroupUI className={componentClassName} {...getValidProps(rest)}>
        {childrenMarkup}
      </ControlGroupUI>
    )
  }
}

setComponentKey(ControlGroup, COMPONENT_KEY)

export default ControlGroup
