import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import isString from 'lodash.isstring'
import isPlainObject from 'lodash.isplainobject'
import Text from '../Text'
import Tooltip from '../Tooltip'
import {
  FilteredListUI,
  BadgeItemUI,
  BadgeUI,
  ItemUI,
  SeparatorUI,
} from './FilteredList.css'

const getItemValue = (item, itemKey) => {
  if (!isString(item) && isPlainObject(item) && itemKey) {
    return item[itemKey]
  }

  return item
}

const FilteredListBadge = props => {
  const { limit, items, itemKey, badgeProps } = props

  const renderBadgeContent = useCallback(() => {
    return items.slice(limit, items.length).map(item => {
      const value = getItemValue(item, itemKey)
      return (
        <BadgeItemUI
          data-cy="FilteredList.BadgeItem"
          data-testid="FilteredList.BadgeItem"
          key={value}
        >
          {value}
        </BadgeItemUI>
      )
    })
  }, [items, limit, itemKey])

  return (
    <Tooltip
      closeOnContentClick={true}
      renderContent={renderBadgeContent}
      withTriggerWrapper={false}
    >
      <BadgeUI
        tabIndex={0}
        isSquare
        data-cy="FilteredList.Badge"
        data-testid="FilteredList.Badge"
        {...badgeProps}
      >
        +{items.length - limit}
      </BadgeUI>
    </Tooltip>
  )
}

const FilteredList = props => {
  const {
    badgeProps,
    children,
    className,
    inline,
    limit,
    renderItem,
    items,
    itemKey,
    ...rest
  } = props
  const componentClassName = classNames(
    'c-FilteredList',
    inline && 'is-inline',
    className
  )

  const renderItems = () => {
    const itemsList = limit ? items.slice(0, limit) : items
    const isListFiltered = limit && items.length > limit

    return itemsList.map((item, index) => {
      const isLastItem = index + 1 >= itemsList.length
      const isBadgeVisible = isListFiltered && isLastItem
      const isSeparatorVisible = !isLastItem && inline
      const value = getItemValue(item, itemKey)

      return (
        <ItemUI
          key={value}
          data-cy="FilteredList.Item"
          data-testid="FilteredList.Item"
        >
          {renderItem && renderItem(item)}
          {!renderItem && <Text data-cy="FilteredList.ItemLabel">{value}</Text>}
          {isBadgeVisible && (
            <FilteredListBadge
              items={items}
              limit={limit}
              itemKey={itemKey}
              badgeProps={badgeProps}
            />
          )}
          {isSeparatorVisible && (
            <SeparatorUI
              data-cy="FilteredList.Separator"
              data-testid="FilteredList.Separator"
            >
              •
            </SeparatorUI>
          )}
        </ItemUI>
      )
    })
  }

  return (
    <FilteredListUI
      aria-label="FilteredList"
      {...getValidProps(rest)}
      className={componentClassName}
    >
      {renderItems()}
    </FilteredListUI>
  )
}

FilteredList.defaultProps = {
  'data-cy': 'FilteredList',
  items: [],
  limit: 5,
}

FilteredList.propTypes = {
  /** Extra props to the badge component */
  badgeProps: PropTypes.object,
  /** Key to pull the value from the object (optional) */
  itemKey: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** List of items that need to be filtered */
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  /** Number of items visible */
  limit: PropTypes.number,
  /** Display the item inline */
  inline: PropTypes.bool,
  renderItem: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default FilteredList
