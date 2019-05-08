import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed, namespaceComponent } from '../../utilities/component'
import Block from './ControlGroup.Block'
import Item from './ControlGroup.Item'
import { ControlGroupUI } from './styles/ControlGroup.css'
import { COMPONENT_KEY } from './ControlGroup.utils'

type Props = {
  className?: string
  children?: any
}

class ControlGroup extends React.PureComponent<Props> {
  static Block = Block
  static Item = Item

  getChildrenMarkup = () => {
    const { children } = this.props

    if (!children) return null

    return React.Children.map(children, (child, index) => {
      if (!isComponentNamed(child, COMPONENT_KEY.Item)) return child

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

namespaceComponent(COMPONENT_KEY.ControlGroup)(ControlGroup)

export default ControlGroup
