// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import {
  isComponentTypeControl,
  namespaceComponent,
} from '../../utilities/component'
import { ItemUI } from './styles/Item.css.js'
import { ITEM_COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  children?: any,
  isBlock: boolean,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
}

class Item extends Component<Props> {
  static defaultProps = {
    isBlock: false,
    isFirst: false,
    isNotOnly: false,
    isLast: false,
  }

  getChildrenMarkup = () => {
    const { children, isFirst, isNotOnly, isLast } = this.props

    if (!children) return null

    return React.Children.map(children, (child, index) => {
      if (!isComponentTypeControl(child)) return child

      return React.cloneElement(child, {
        isFirst,
        isNotOnly,
        isLast,
      })
    })
  }

  render() {
    const {
      children,
      className,
      isBlock,
      isFirst,
      isLast,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ControlGroupItem',
      isBlock && 'is-block',
      isFirst && 'is-first',
      isLast && 'is-last',
      className
    )

    const childrenMarkup = this.getChildrenMarkup()

    return (
      <ItemUI className={componentClassName} {...getValidProps(rest)}>
        {childrenMarkup}
      </ItemUI>
    )
  }
}

namespaceComponent(ITEM_COMPONENT_KEY)(Item)

export default Item
