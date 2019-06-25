import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
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
  className: string
  items: string[]
  limit: number
  inline: boolean
}

export class FilteredList extends React.Component<Props> {
  static defaultProps = {
    items: [],
  }

  shouldComponentUpdate(nextProps) {
    const { items } = this.props

    if (nextProps.items.length !== items.length) {
      return true
    }

    if (nextProps.items.sort().join(':') !== items.sort().join(':')) {
      return true
    }

    return false
  }

  getUniqueItems() {
    return this.props.items.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
  }

  renderBadgeContent = () => {
    const { limit } = this.props
    const items = this.getUniqueItems()
    return items.slice(limit, items.length).map(email => (
      <BadgeItemUI data-cy="FilteredList.BadgeItem" key={email}>
        {email}
      </BadgeItemUI>
    ))
  }

  renderBadge() {
    const { limit } = this.props
    const items = this.getUniqueItems()

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
    const { limit, inline } = this.props
    const items = this.getUniqueItems()

    const itemsList = limit ? items.slice(0, limit) : items
    const isListFiltered = limit && items.length > limit

    return itemsList.map((email, index) => {
      const isLastItem = index + 1 >= limit
      const isBadgeVisible = isListFiltered && isLastItem
      const isSeparatorVisible = !isLastItem && inline

      return (
        <ItemUI key={email} data-cy="FilteredList.Item">
          <Text>{email}</Text>
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
