import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { isFunction, isObject, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import {
  getItemContentKeyName,
  isItemADivider,
  isItemAGroupLabel,
  isItemReset,
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
      onReset = noop,
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
    const isReset = isItemReset(item)

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
        isReset && 'is-reset-item',
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
        {withMultipleSelection && !isReset ? (
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
