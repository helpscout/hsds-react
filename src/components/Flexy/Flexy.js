// @flow
import React, { PureComponent as Component } from 'react'
import Block from './Block'
import Item from './Item'
import classNames from '../../utilities/classNames'
import type { Align, Gap, Just } from './types.js'

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
      align && `is-${align}`,
      gap && `c-Flexy--gap-${gap}`,
      just && `c-Flexy--just-${just}`,
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

export default Flexy
