// @ts-ignore
import {
  changeDirection,
  onMenuMounted,
  onMenuUnmounted,
  setMenuNode,
  setTriggerNode,
  toggleOpen,
  openDropdown,
  closeDropdown,
  selectItem,
} from '../Dropdown.actions'

const mockTriggerNode = {
  focus: jest.fn(),
}
const mockItem = {
  label: 'Ron',
  onClick: jest.fn(),
  value: 'ron',
}

jest.mock('../Dropdown.renderUtils', () => {
  return {
    findClosestItemDOMNode: () => true,
    getIndexFromItemDOMNode: () => '1',
    getValueFromItemDOMNode: () => 'ron',
    findTriggerNode: () => mockTriggerNode,
  }
})

jest.mock('../Dropdown.utils', () => {
  return {
    getItemFromCollection: () => mockItem,
    itemIsActive: () => true,
  }
})

describe('onMenuMounted', () => {
  test('Change isMounted state to true', () => {
    const state = { isMounted: false }
    const nextState = onMenuMounted(state)

    expect(nextState.isMounted).toBe(true)
  })

  test('Fires onMenuMount callback', () => {
    const spy = jest.fn()
    const state = { isMounted: false, onMenuMount: spy }
    const nextState = onMenuMounted(state)

    expect(nextState.isMounted).toBe(true)
    expect(spy).toHaveBeenCalled()
  })
})

describe('onMenuUnmounted', () => {
  test('Change isMounted state to false', () => {
    const state = { isMounted: true }
    const nextState = onMenuUnmounted(state)

    expect(nextState.isMounted).toBe(false)
  })

  test('Fires onMenuMount callback', () => {
    const spy = jest.fn()
    const state = { isMounted: true, onMenuUnmount: spy }
    const nextState = onMenuUnmounted(state)

    expect(nextState.isMounted).toBe(false)
    expect(spy).toHaveBeenCalled()
  })
})

describe('setMenuNode', () => {
  test('Sets a menuNode onto the state', () => {
    const state = {}
    const mockElement = {}
    const nextState = setMenuNode(state, mockElement)

    expect(nextState.menuNode).toBe(mockElement)
  })
})

describe('setTriggerNode', () => {
  test('Sets a triggerNode onto the state', () => {
    const state = {}
    const mockElement = {}
    const nextState = setTriggerNode(state, mockElement)

    expect(nextState.triggerNode).toBe(mockElement)
  })
})

describe('changeDirection', () => {
  test('Changes direction from left to right', () => {
    const state = {
      direction: 'left',
    }

    const nextState = changeDirection(state)

    expect(nextState.direction).toBe('right')
  })

  test('Changes direction from right to left', () => {
    const state = {
      direction: 'right',
    }

    const nextState = changeDirection(state)

    expect(nextState.direction).toBe('left')
  })

  test('Defaults to right', () => {
    const state = {
      direction: 'invalid',
    }

    const nextState = changeDirection(state)

    expect(nextState.direction).toBe('right')
  })
})

describe('toggleOpen', () => {
  test('Toggles to open', () => {
    const state = {
      isOpen: false,
    }

    const nextState = toggleOpen(state)

    expect(nextState.isOpen).toBe(true)
  })

  test('Toggles to close', () => {
    const state = {
      isOpen: false,
    }

    const nextState = toggleOpen(state)

    expect(nextState.isOpen).toBe(true)
  })

  test('Toggles to open/close', () => {
    const state = {
      isOpen: false,
    }

    const nextState = toggleOpen(toggleOpen(state))

    expect(nextState.isOpen).toBe(false)
  })

  test('Fires onOpen callback, if provided', () => {
    const spy = jest.fn()
    const state = {
      isOpen: false,
      onOpen: spy,
    }

    toggleOpen(state)

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onClose callback, if provided', () => {
    const spy = jest.fn()
    const state = {
      isOpen: true,
      onClose: spy,
    }

    toggleOpen(state)

    expect(spy).toHaveBeenCalled()
  })
})

describe('openDropdown', () => {
  test('Sets to open', () => {
    const state = {
      isOpen: false,
    }

    const nextState = openDropdown(state)

    expect(nextState.isOpen).toBe(true)
  })

  test('Fires onOpen callback, if provided', () => {
    const spy = jest.fn()
    const state = {
      isOpen: false,
      onOpen: spy,
    }

    openDropdown(state)

    expect(spy).toHaveBeenCalled()
  })

  test('Does not fire onClose callback, if provided', () => {
    const spy = jest.fn()
    const state = {
      isOpen: false,
      onClose: spy,
    }

    openDropdown(state)
    openDropdown(state)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Resets index and related props', () => {
    const state = {
      index: '123',
      isOpen: false,
    }

    const nextState = openDropdown(state)

    expect(nextState.index).toBeFalsy()
  })
})

describe('closeDropdown', () => {
  test('Sets to open', () => {
    const state = {
      isOpen: true,
    }

    const nextState = closeDropdown(state)

    expect(nextState.isOpen).toBe(false)
  })

  test('Fires onClose callback, if provided', () => {
    const spy = jest.fn()
    const state = {
      isOpen: true,
      onClose: spy,
    }

    closeDropdown(state)

    expect(spy).toHaveBeenCalled()
  })

  test('Does not fire onOpen callback, if provided', () => {
    const spy = jest.fn()
    const state = {
      isOpen: false,
      onOpen: spy,
    }

    closeDropdown(state)
    closeDropdown(state)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Resets index and related props', () => {
    const state = {
      index: '123',
      isOpen: true,
    }

    const nextState = closeDropdown(state)

    expect(nextState.index).toBeFalsy()
  })
})

describe('selectItem', () => {
  test('Stores the selectedItem from getItemFromCollection', () => {
    const state = { selectedItem: undefined }
    const event = {}
    const nextState = selectItem(state, event)

    expect(nextState.selectedItem).toBe(mockItem)
  })

  test('Does not store the selectedItem, if clearOnSelect is set', () => {
    const state = { clearOnSelect: true, selectedItem: undefined }
    const event = {}
    const nextState = selectItem(state, event)

    expect(nextState.selectedItem).toBeFalsy()
  })

  test('Fires the onSelect callback, on select', () => {
    const spy = jest.fn()
    const state = {
      onSelect: spy,
      selectedItem: undefined,
      clearOnSelect: true,
    }
    const event = {}

    selectItem(state, event)

    expect(spy).toHaveBeenCalledWith(mockItem.value, {
      dropdownType: 'hsds-dropdown-v2',
      event,
      deselected: undefined,
      item: mockItem,
    })
  })

  test('Fires the item.onClick callback, on select', () => {
    const state = { selectedItem: undefined }
    const event = {}

    selectItem(state, event)

    expect(mockItem.onClick).toHaveBeenCalledWith(event)
  })

  test('Closes Dropdown on select, if closeOnSelect', () => {
    const state = { isOpen: true, closeOnSelect: true }
    const event = {}

    const nextState = selectItem(state, event)

    expect(nextState.isOpen).toBe(false)
  })

  test('Does not close Dropdown on select, if closeOnSelect is false', () => {
    const state = { isOpen: true, closeOnSelect: false }
    const event = {}

    const nextState = selectItem(state, event)

    expect(nextState.isOpen).toBe(true)
  })

  test('Refocuses triggerNode on select + close', () => {
    const state = { isOpen: true, closeOnSelect: true }
    const event = {}

    const nextState = selectItem(state, event)

    expect(mockTriggerNode.focus).toHaveBeenCalled()
  })
})
