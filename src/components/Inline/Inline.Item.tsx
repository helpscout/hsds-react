import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ItemUI } from './styles/Inline.css'
import { ITEM_COMPONENT_KEY } from './Inline.utils'

export interface Props {
  className?: string
  children?: any
  ref: (node: HTMLElement) => void
}

export class Item extends React.PureComponent<Props> {
  static className = 'c-InlineItem'
  static defaultProps = {
    ref: noop,
  }

  getClassName() {
    const { className } = this.props
    return classNames(Item.className, className)
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={ref as any}
        role="listitem"
      >
        {children}
      </ItemUI>
    )
  }
}

const PropConnectedComponent = propConnect(ITEM_COMPONENT_KEY)(Item)

export default PropConnectedComponent
