import { useSelect, useCombobox } from 'downshift'
import { isObject } from '../../utilities/is'
import {
  findItemInArray,
  getEnabledItemIndex,
  getItemContentKeyName,
} from './DropList.utils'
import { VARIANTS } from './DropList.constants'

const { SELECT, COMBOBOX } = VARIANTS

export function stateReducerCommon({
  changes,
  closeOnSelection,
  highlightIndexControlled,
  items,
  selectedItems,
  state,
  type,
  withMultipleSelection,
}) {
  switch (type) {
    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputChange}`:
      return {
        ...changes,
      }

    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputBlur}`:
      return {
        ...changes,
        selectedItem: state.selectedItem,
        inputValue: '',
      }

    case `${COMBOBOX}.${useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem}`:
    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputKeyDownEnter}`:
    case `${COMBOBOX}.${useCombobox.stateChangeTypes.ItemClick}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownEnter}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownSpaceButton}`:
    case `${SELECT}.${useSelect.stateChangeTypes.ItemClick}`:
      if (withMultipleSelection) {
        const newState = {
          ...changes,
          isOpen: !closeOnSelection ? true : changes.isOpen,
          highlightedIndex: !closeOnSelection
            ? state.highlightedIndex
            : changes.highlightedIndex,
          inputValue: '',
        }
        const contentKey = getItemContentKeyName(changes.selectedItem)

        if (
          Boolean(
            findItemInArray({
              arr: selectedItems,
              item: changes.selectedItem,
              key: contentKey,
            })
          )
        ) {
          newState.selectedItem = isObject(changes.selectedItem)
            ? {
                ...changes.selectedItem,
                remove: true,
              }
            : {
                [contentKey || 'label']: changes.selectedItem,
                remove: true,
              }
        }
        return newState
      } else {
        return { ...changes, inputValue: '' }
      }

    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputKeyDownArrowUp}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownArrowUp}`: {
      const { highlightedIndex: currentHighlightedIndex } = state
      const { highlightedIndex: nextHighlightedIndex } = changes

      return {
        ...changes,
        highlightedIndex: getEnabledItemIndex({
          currentHighlightedIndex,
          nextHighlightedIndex:
            highlightIndexControlled != null
              ? currentHighlightedIndex - 1
              : nextHighlightedIndex,
          items,
          arrowKey: 'UP',
        }),
      }
    }

    case `${COMBOBOX}.${useCombobox.stateChangeTypes.FunctionSetHighlightedIndex}`: {
      const { highlightedIndex: currentHighlightedIndex } = state
      const { highlightedIndex: nextHighlightedIndex } = changes
      if (currentHighlightedIndex === -1) {
        return changes
      }
      return {
        ...changes,
        highlightedIndex: getEnabledItemIndex({
          currentHighlightedIndex,
          nextHighlightedIndex,
          items,
          arrowKey:
            nextHighlightedIndex > currentHighlightedIndex ? 'DOWN' : 'UP',
        }),
      }
    }

    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputKeyDownArrowDown}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownArrowDown}`: {
      const { highlightedIndex: nextHighlightedIndex } = changes
      const { highlightedIndex: currentHighlightedIndex } = state

      return {
        ...changes,
        highlightedIndex: getEnabledItemIndex({
          currentHighlightedIndex,
          nextHighlightedIndex:
            highlightIndexControlled != null
              ? currentHighlightedIndex + 1
              : nextHighlightedIndex,
          items,
          arrowKey: 'DOWN',
        }),
      }
    }

    default:
      return changes
  }
}

export function onIsOpenChangeCommon({
  closeOnSelection,
  toggleOpenedState,
  type,
}) {
  switch (type) {
    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputKeyDownEnter}`:
    case `${COMBOBOX}.${useCombobox.stateChangeTypes.ItemClick}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownSpaceButton}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownEnter}`:
    case `${SELECT}.${useSelect.stateChangeTypes.ItemClick}`:
      closeOnSelection && toggleOpenedState(false)
      break

    case `${COMBOBOX}.${useCombobox.stateChangeTypes.InputKeyDownEscape}`:
    case `${SELECT}.${useSelect.stateChangeTypes.MenuKeyDownEscape}`:
      toggleOpenedState(false)
      break

    default:
      break
  }
}

// Haven't found a realiable way to test this, it's handled by downshift so no big deal
/* istanbul ignore next */
export function getA11ySelectionMessageCommon({
  selectedItem,
  selectedItems,
  withMultipleSelection,
}) {
  if (selectedItem == null && selectedItems.length === 0) {
    return 'All have been deselected'
  }

  const contentKey = getItemContentKeyName(selectedItem)
  const msg = isObject(selectedItem) ? selectedItem[contentKey] : selectedItem

  if (!withMultipleSelection) {
    return `${msg} was selected`
  }
  const foundItem = findItemInArray({
    arr: selectedItems,
    item: selectedItem,
    key: contentKey,
  })

  if (Boolean(foundItem)) {
    return `${msg} was selected`
  }

  return `${msg} was deselected`
}
