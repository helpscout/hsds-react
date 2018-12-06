import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ListBorder, ListGenericProps } from './List.types'
import PropProvider from '../PropProvider/PropProvider'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import Item from './List.Item'
import { COMPONENT_KEY } from './List.utils'
import { BulletListUI, NumberedListUI } from './List.css'

export interface Props extends ListGenericProps {
  border: ListBorder
  display: 'block' | 'flex'
}

export class List extends React.PureComponent<Props> {
  static defaultProps = {
    border: '',
    display: 'block',
    inlineSize: 'md',
    role: 'list',
  }

  static Item = Item

  getItemProps() {
    const { border, inlineSize, size, type } = this.props
    const isListItem = type === 'bullet' || type === 'number'

    const borderStyle = border

    return {
      borderStyle,
      isListItem,
      inlineSize,
      size,
      type,
    }
  }

  render() {
    const {
      border,
      children,
      className,
      display,
      inlineSize,
      size,
      type,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-List',
      border === 'dot' && 'is-dotted',
      border === 'line' && 'is-bordered',
      display && `is-display-${display}`,
      inlineSize && `is-inline-${inlineSize}`,
      size && `is-${size}`,
      type && `is-${type}`,
      className
    )

    let OuterComponent = BulletListUI
    if (type === 'number') {
      OuterComponent = NumberedListUI
    }

    return (
      <PropProvider value={{ [COMPONENT_KEY.Item]: this.getItemProps() }}>
        <OuterComponent {...getValidProps(rest)} className={componentClassName}>
          {children}
        </OuterComponent>
      </PropProvider>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.List)(List)

export default PropConnectedComponent
