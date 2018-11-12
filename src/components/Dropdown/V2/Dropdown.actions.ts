import { selectors, getItemFromCollection } from './Dropdown.utils'

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

export const onSelect = (state, event) => {
  const { items, activeValue, onSelect } = state
  const item = getItemFromCollection(items, activeValue)
  if (item) {
    onSelect(item.value, { event, item })
  }
}
