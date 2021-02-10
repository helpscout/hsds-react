import React, { forwardRef } from 'react'
import { isObject } from '../../utilities/is'
import { isItemADivider, isItemAGroupLabel } from './DropList.utils'
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
      ...itemProps
    },
    ref
  ) => {
    if (isItemADivider(item)) {
      return <DividerUI key={`divider_${index}`} />
    }

    if (isItemAGroupLabel(item)) {
      return (
        <GroupLabelUI key={`group_label_${index}`}>{item.label}</GroupLabelUI>
      )
    }

    return (
      <ListItemUI
        ref={ref}
        highlighted={highlightedIndex === index}
        selected={isSelected}
        withMultipleSelection={withMultipleSelection}
        {...itemProps}
      >
        <span>{isObject(item) ? item.label : item}</span>
        {withMultipleSelection && isSelected ? <SelectedBadge /> : null}
      </ListItemUI>
    )
  }
)

export function generateListItemKey(item, index) {
  return isObject(item)
    ? item.id || `${item.label}_${index}`
    : `${item}_${index}`
}

export default ListItem
