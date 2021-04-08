import React, { forwardRef } from 'react'
import { classNames } from '../../utilities/classNames'
import { isFunction, isObject, isString } from '../../utilities/is'
import {
  getItemContentKeyName,
  isItemADivider,
  isItemAGroupLabel,
} from './DropList.utils'
import {
  DividerUI,
  GroupLabelUI,
  ListItemUI,
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
        highlightedIndex === index && 'is-highlighted',
        withMultipleSelection && 'with-multiple-selection',
        isString(extraClassNames) && extraClassNames
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
        <span>{isObject(item) ? item[contentKey] : item}</span>
        {withMultipleSelection ? (
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
