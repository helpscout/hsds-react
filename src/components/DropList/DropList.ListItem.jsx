import React, { forwardRef } from 'react'
import classNames from 'classnames'
import isFunction from 'lodash.isfunction'
import isNil from 'lodash.isnil'
import isPlainObject from 'lodash.isplainobject'
import isString from 'lodash.isstring'
import {
  getItemContentKeyName,
  isItemAction,
  isItemADivider,
  isItemInert,
  isItemAGroupLabel,
  emphasizeSubstring,
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
      inputValue,
      ...itemProps
    },
    ref
  ) => {
    if (!inputValue && item.hideOnEmptyInputValue) {
      return null
    }

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

    if (!isNil(renderCustomListItem) && isFunction(renderCustomListItem)) {
      return (
        <ListItemUI
          className={getListItemClassNames('DropListItem--custom')}
          highlighted={highlightedIndex === index}
          ref={ref}
          selected={isSelected}
          withMultipleSelection={withMultipleSelection}
          {...itemProps}
        >
          {renderCustomListItem({
            item,
            isSelected,
            isHighlighted: highlightedIndex === index,
            withMultipleSelection,
            isDisabled,
          })}
        </ListItemUI>
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
        <ListItemTextUI
          dangerouslySetInnerHTML={getListItemText({
            label: isPlainObject(item) ? item[contentKey] : item,
            emphasize: inputValue && !isItemAction(item) && !isItemInert(item),
            substr: inputValue,
          })}
        />
        {withMultipleSelection && !isItemAction(item) ? (
          <SelectedBadge isSelected={isSelected} />
        ) : null}
      </ListItemUI>
    )
  }
)

/**
 * If `substr` is passed, we want to emphasize that with html's <strong />
 */
export function getListItemText({ label, emphasize, substr }) {
  const __html = emphasize ? emphasizeSubstring(label, substr) : label

  return {
    __html,
  }
}

export function generateListItemKey(item, index) {
  const contentKey = getItemContentKeyName(item)

  return isPlainObject(item)
    ? item.id || `${item[contentKey]}_${index}`
    : `${item}_${index}`
}

export default ListItem
