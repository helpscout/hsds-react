import store from './Dropdown.store'
import { selectors, getItemFromCollection, pathResolve } from './Dropdown.utils'

const initialItemState = {
  activeItem: null,
  activeIndex: null,
  activeValue: null,
  activeId: null,
}

export const getState = () => store.getState()

export const setActiveItem = (state, activeItem) => {
  const { id } = state
  const activeIndex = activeItem.getAttribute(selectors.indexAttribute)
  const activeValue = activeItem.getAttribute(selectors.valueAttribute)
  const activeId = id ? pathResolve(id, activeIndex) : null

  return {
    ...state,
    activeItem,
    activeIndex,
    activeValue,
    activeId,
  }
}

export const changeDirection = state => {
  return {
    ...state,
    direction: state.direction === 'right' ? 'left' : 'right',
  }
}

export const toggleOpen = state => {
  if (state.isOpen) {
    return closeDropdown(state)
  } else {
    return openDropdown(state)
  }
}

export const openDropdown = state => {
  // Trigger callback from Provider
  state.onOpen && state.onOpen()

  return {
    ...state,
    isOpen: true,
    ...initialItemState,
  }
}

export const closeDropdown = state => {
  // Trigger callback from Provider
  state.onClose && state.onClose()

  return {
    ...state,
    isOpen: false,
    ...initialItemState,
  }
}

export const onSelect = (state, event) => {
  const { items, activeValue, onSelect } = state
  const item = getItemFromCollection(items, activeValue)

  // Trigger callback from Provider
  /* istanbul ignore else */
  if (item && onSelect) {
    onSelect(item.value, { event, item, dropdownType: 'hsds-dropdown-v2' })
  }

  if (state.closeOnSelect) {
    return closeDropdown(state)
  } else {
    return state
  }
}

export const setEventTargetAsActive = (state, event: Event) => {
  const node = event.currentTarget as HTMLElement
  if (node) {
    return setActiveItem(state, node)
  }

  return state
}

export const itemOnMouseEnter = (state, event: MouseEvent) => {
  return setEventTargetAsActive(state, event)
}

export const itemOnFocus = (state, event: Event) => {
  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  return setEventTargetAsActive(state, event)
}

export const itemOnClick = (state, event: Event, props: any = {}) => {
  const { hasSubMenu } = props
  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  if (hasSubMenu) return

  return onSelect(state, event)
}
