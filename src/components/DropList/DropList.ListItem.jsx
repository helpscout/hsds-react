import React, { forwardRef } from 'react'
import classNames from 'classnames'
import isString from 'lodash.isstring'
import { isFunction, isObject } from '../../utilities/is'
import {
  getItemContentKeyName,
  isItemAction,
  isItemADivider,
  isItemAGroupLabel,
  objectHasKey,
} from './DropList.utils'
import {
  DividerUI,
  GroupLabelUI,
  ListItemUI,
  ListItemTextUI,
  SelectedBadge,
} from './DropList.css'

const ListItem = forwardRef(
  (
    {
      item,
      index,
      highlightedIndex,
      withMultipleSelection,
      isSelected,
      renderCustomListItem,
      isDisabled,
      ...itemProps
    },
    ref
  ) => {
    if (isItemADivider(item)) {
      return (
        <DividerUI className="DropListItem--divider" key={`divider_${index}`} />
      )
    }

    const contentKey = getItemContentKeyName(item)

    if (isItemAGroupLabel(item)) {
      return (
        <GroupLabelUI
          className="DropListItem--groupLabel"
          key={`group_label_${index}`}
        >
          {item[contentKey]}
        </GroupLabelUI>
      )
    }

    function getListItemClassNames(extraClassNames) {
      return classNames(
        'DropListItem',
        isSelected && 'is-selected',
        isDisabled && 'is-disabled',
        objectHasKey(item, 'type') && `is-type-${item.type}`,
        highlightedIndex === index && 'is-highlighted',
        withMultipleSelection && 'with-multiple-selection',
        isString(extraClassNames) && extraClassNames,
        objectHasKey(item, 'className') && item.className
      )
    }

    if (renderCustomListItem != null && isFunction(renderCustomListItem)) {
      return (
        <li
          className={getListItemClassNames('DropListItem--custom')}
          ref={ref}
          {...itemProps}
        >
          {renderCustomListItem({
            item,
            isSelected,
            isHighlighted: highlightedIndex === index,
            withMultipleSelection,
            isDisabled,
          })}
        </li>
      )
    }

    return (
      <ListItemUI
        className={getListItemClassNames()}
        highlighted={highlightedIndex === index}
        ref={ref}
        selected={isSelected}
        withMultipleSelection={withMultipleSelection}
        {...itemProps}
      >
        <ListItemTextUI>
          {isObject(item) ? item[contentKey] : item}
        </ListItemTextUI>
        {withMultipleSelection && !isItemAction(item) ? (
          <SelectedBadge isSelected={isSelected} />
        ) : null}
      </ListItemUI>
    )
  }
)

export function generateListItemKey(item, index) {
  const contentKey = getItemContentKeyName(item)

  return isObject(item)
    ? item.id || `${item[contentKey]}_${index}`
    : `${item}_${index}`
}

export default ListItem
