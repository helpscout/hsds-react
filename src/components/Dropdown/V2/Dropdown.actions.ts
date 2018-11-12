import { selectors, getItemFromCollection } from './Dropdown.utils'

const initialItemState = {
  activeItem: null,
  activeIndex: null,
  activeValue: null,
}

export const setActiveItem = (state, activeItem) => {
  return {
    ...state,
    activeItem,
    activeIndex: activeItem.getAttribute(selectors.indexAttribute).toString(),
    activeValue: activeItem.getAttribute(selectors.valueAttribute).toString(),
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
  return {
    ...state,
    isOpen: true,
    ...initialItemState,
  }
}

export const closeDropdown = state => {
  return {
    ...state,
    isOpen: false,
    ...initialItemState,
  }
}

export const onSelect = (state, event) => {
  const { items, activeValue, onSelect } = state
  const item = getItemFromCollection(items, activeValue)

  if (item) {
    onSelect(item.value, { event, item })
  }

  if (state.closeOnSelect) {
    return closeDropdown(state)
  } else {
    return state
  }
}
