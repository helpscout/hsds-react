import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Inline.Item'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { InlineUI } from './styles/Inline.css'
import { COMPONENT_KEY } from './Inline.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  size: 'lg' | 'md' | 'sm' | 'xs'
}

export class Inline extends React.PureComponent<Props> {
  static className = 'c-Inline'
  static defaultProps = {
    innerRef: noop,
    size: 'sm',
  }

  static Item = Item

  getClassName() {
    const { className, size } = this.props
    return classNames(Inline.className, size && `is-${size}`, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <InlineUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef as any}
        role="list"
      >
        {children}
      </InlineUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Inline)

export default PropConnectedComponent
