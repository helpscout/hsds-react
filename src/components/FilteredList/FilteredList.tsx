import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { isString, isObject } from '../../utilities/is'
import { COMPONENT_KEY } from './FilteredList.utils'

import Text from '../Text'
import Tooltip from '../Tooltip'

import {
  FilteredListUI,
  BadgeItemUI,
  BadgeUI,
  ItemUI,
  SeparatorUI,
} from './styles/FilteredList.css.js'

export interface Props {
  className?: string
  items: string[]
  itemKey?: string
  limit: number
  inline?: boolean
  renderItem?: (object) => React.ReactNode
}

export class FilteredList extends React.Component<Props> {
  static defaultProps = {
    items: [],
    limit: 5,
  }

  shouldComponentUpdate(nextProps) {
    const { items } = this.props

    if (nextProps.items.length !== items.length) {
      return true
    }

    const itemKey = items
      .map(this.getItemValue)
      .sort()
      .join(':')

    const nextItemKey = nextProps.items
      .map(this.getItemValue)
      .sort()
      .join(':')

    if (nextItemKey !== itemKey) {
      return true
    }

    return false
  }

  getItemValue = item => {
    if (!isString(item) && isObject(item) && this.props.itemKey) {
      return item[this.props.itemKey]
    }

    return item
  }

  renderBadgeContent = () => {
    const { limit, items } = this.props
    return items.slice(limit, items.length).map(item => {
      const value = this.getItemValue(item)
      return (
        <BadgeItemUI data-cy="FilteredList.BadgeItem" key={value}>
          {value}
        </BadgeItemUI>
      )
    })
  }

  renderBadge() {
    const { limit, items } = this.props

    return (
      <Tooltip renderContent={this.renderBadgeContent}>
        <BadgeUI isSquare data-cy="FilteredList.Badge">
          +{items.length - limit}
        </BadgeUI>
      </Tooltip>
    )
  }

  renderSeparator() {
    return <SeparatorUI data-cy="FilteredList.Separator">•</SeparatorUI>
  }

  renderItems() {
    const { limit, inline, renderItem, items } = this.props

    const itemsList = limit ? items.slice(0, limit) : items
    const isListFiltered = limit && items.length > limit

    return itemsList.map((item, index) => {
      const isLastItem = index + 1 >= limit
      const isBadgeVisible = isListFiltered && isLastItem
      const isSeparatorVisible = !isLastItem && inline
      const value = this.getItemValue(item)

      return (
        <ItemUI key={value} data-cy="FilteredList.Item">
          {renderItem && renderItem(item)}
          {!renderItem && <Text data-cy="FilteredList.ItemLabel">{value}</Text>}
          {isBadgeVisible && this.renderBadge()}
          {isSeparatorVisible && this.renderSeparator()}
        </ItemUI>
      )
    })
  }

  render() {
    const { children, className, inline, ...rest } = this.props

    const componentClassName = classNames(
      'c-FilteredList',
      inline && 'is-inline',
      className
    )

    return (
      <FilteredListUI
        data-cy="FilteredList"
        aria-label="FilteredList"
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {this.renderItems()}
      </FilteredListUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(FilteredList)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(FilteredList)

export default PropConnectedComponent
