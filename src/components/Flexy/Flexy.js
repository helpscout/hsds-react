// @flow
import type { Align, Gap, Just } from './types.js'
import React, { PureComponent as Component } from 'react'
import Block from './Block'
import Item from './Item'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { FlexyUI } from './styles/Flexy.css.js'

type Props = {
  align: Align,
  children?: any,
  className?: string,
  gap: Gap,
  just: Just,
}

class Flexy extends Component<Props> {
  static defaultProps = {
    gap: 'sm',
  }

  static Block = Block
  static Item = Item

  render() {
    const { align, children, className, gap, just, ...rest } = this.props

    const componentClassName = classNames(
      'c-Flexy',
      align && `is-align-${align} is-${align}`,
      gap && `is-gap-${gap}`,
      just && `is-just-${just}`,
      className
    )

    return (
      <FlexyUI className={componentClassName} {...rest}>
        {children}
      </FlexyUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Flexy)(Flexy)

export default Flexy
