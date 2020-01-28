import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ItemUI } from './Inline.css'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export class Item extends React.PureComponent<Props> {
  static className = 'c-InlineItem'
  static defaultProps = {
    innerRef: noop,
  }
  static displayName = 'InlineItem'

  getClassName() {
    const { className } = this.props
    return classNames(Item.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef as any}
        role="listitem"
      >
        {children}
      </ItemUI>
    )
  }
}

export default Item
