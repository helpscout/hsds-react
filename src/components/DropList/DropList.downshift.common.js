import { useSelect, useCombobox } from 'downshift'
import { isObject } from '../../utilities/is'
import { findItemInArray, removeItemFromArray } from './DropList.utils'

export function onStateChangeCommon({
  changes,
  withMultipleSelection,
  onSelectionChange,
  selectItem,
  selectedItems,
  setSelectedItems,
}) {
  const { type, selectedItem } = changes

  switch (type) {
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.ItemClick:
      if (!withMultipleSelection) {
        onSelectionChange(Boolean(selectedItem) ? selectedItem : null)
        !Boolean(selectedItem) && selectItem(null)
      } else {
        if (selectedItem) {
          const { remove } = selectedItem

          if (!Boolean(remove)) {
            const added = selectedItems.concat(selectedItem)

            setSelectedItems(added)
            onSelectionChange(added)
          } else {
            const itemToRemove = findItemInArray({
              arr: selectedItems,
              item: changes.selectedItem,
            })

            if (Boolean(itemToRemove)) {
              const removed = removeItemFromArray({
                arr: selectedItems,
                item: itemToRemove,
              })
              setSelectedItems(removed)
              onSelectionChange(removed)

              selectedItems.length === 1 && selectItem(null)
            }
          }
        }
      }

      break

    default:
      break
  }
}

export function stateReducerCommon({
  state,
  actionAndChanges,
  withMultipleSelection,
  closeOnSelection,
  selectedItems,
}) {
  const { type, changes } = actionAndChanges

  switch (type) {
    case useCombobox.stateChangeTypes.InputChange:
      return {
        ...changes,
        highlightedIndex: 0,
      }

    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.ItemClick:
      if (withMultipleSelection) {
        const newState = {
          ...changes,
          isOpen: !closeOnSelection ? true : changes.isOpen,
          highlightedIndex: !closeOnSelection
            ? state.highlightedIndex
            : changes.highlightedIndex,
          inputValue: '',
        }

        if (
          Boolean(
            findItemInArray({
              arr: selectedItems,
              item: changes.selectedItem,
            })
          )
        ) {
          newState.selectedItem = isObject(changes.selectedItem)
            ? {
                ...changes.selectedItem,
                remove: true,
              }
            : {
                label: changes.selectedItem,
                remove: true,
              }
        }
        return newState
      } else {
        return { ...changes, inputValue: '' }
      }

    default:
      return changes
  }
}

export function onIsOpenChangeCommon({
  changes,
  closeOnSelection,
  toggleOpenedState,
}) {
  const { type } = changes

  switch (type) {
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.ItemClick:
      closeOnSelection && toggleOpenedState(false)
      break

    case useCombobox.stateChangeTypes.InputKeyDownEscape:
    case useSelect.stateChangeTypes.MenuKeyDownEscape:
      toggleOpenedState(false)
      break

    default:
      break
  }
}

export function getA11ySelectionMessageCommon({
  selectedItem,
  selectedItems,
  withMultipleSelection,
}) {
  if (selectedItem == null && selectedItems.length === 0) {
    return 'All have been deselected'
  }

  const msg = isObject(selectedItem) ? selectedItem.label : selectedItem

  if (!withMultipleSelection) {
    return `${msg} was selected`
  }

  const foundItem = findItemInArray({
    arr: selectedItems,
    item: selectedItem,
  })

  if (!Boolean(foundItem)) {
    return `${msg} was selected`
  }

  return `${msg} was deselected`
}
