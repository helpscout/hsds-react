// @ts-ignore
import {
  setActiveItem,
  setTriggerNode,
  changeDirection,
  toggleOpen,
  openDropdown,
  closeDropdown,
  onSelect,
  setEventTargetAsActive,
  itemOnMouseEnter,
  itemOnFocus,
  itemOnClick,
} from '../Dropdown.actions'
import { selectors } from '../Dropdown.utils'

describe('setActiveItem', () => {
  test('Updates the state with the activeItem DOM node', () => {
    const state = {
      activeItem: null,
      activeIndex: null,
      activeValue: null,
      activeId: null,
      id: 'ron',
    }

    const activeItem = document.createElement('div')
    activeItem.setAttribute(selectors.indexAttribute, '123')
    activeItem.setAttribute(selectors.valueAttribute, 'Hello')

    const nextState = setActiveItem(state, activeItem)

    expect(nextState).not.toEqual(state)
    expect(nextState.activeItem).toBe(activeItem)
    expect(nextState.activeIndex).toBe('123')
    expect(nextState.activeValue).toBe('Hello')
    expect(nextState.activeId).toContain('ron')
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

  test('Resets activeItem and related props', () => {
    const state = {
      activeItem: '123',
      activeId: '456',
      isOpen: false,
    }

    const nextState = openDropdown(state)

    expect(nextState.activeItem).toBeFalsy()
    expect(nextState.activeId).toBeFalsy()
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

  test('Resets activeItem and related props', () => {
    const state = {
      activeItem: '123',
      activeId: '456',
      isOpen: true,
    }

    const nextState = closeDropdown(state)

    expect(nextState.activeItem).toBeFalsy()
    expect(nextState.activeId).toBeFalsy()
  })
})

describe('onSelect', () => {
  test('Fires onSelect callback, if provided', () => {
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {}

    onSelect(state, mockEvent)

    expect(state.onSelect).toHaveBeenCalledWith('ron', {
      dropdownType: 'hsds-dropdown-v2',
      event: mockEvent,
      item: { value: 'ron' },
    })
  })

  test('Returns state as is', () => {
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {}

    const nextState = onSelect(state, mockEvent)

    expect(nextState).toBe(state)
  })

  test('Performs closeDropdown action, if specified', () => {
    const spy = jest.fn()
    const state = {
      // This one
      closeOnSelect: true,
      /////
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
      isOpen: true,
      onClose: spy,
    }

    const mockEvent = {}

    const nextState = onSelect(state, mockEvent)

    expect(nextState).not.toBe(state)
    expect(nextState.isOpen).toBe(false)
    expect(spy).toHaveBeenCalled()
  })

  test('Does not performs closeDropdown action, if specified', () => {
    const spy = jest.fn()
    const state = {
      // This one
      closeOnSelect: false,
      /////
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
      isOpen: true,
      onClose: spy,
    }

    const mockEvent = {}

    const nextState = onSelect(state, mockEvent)

    expect(nextState).toBe(state)
    expect(nextState.isOpen).toBe(true)
    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not fire onSelect if item cannot be found', () => {
    const spy = jest.fn()
    const state = {
      items: [{ value: 'champ' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: spy,
    }

    const mockEvent = {}

    onSelect(state, mockEvent)

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('setEventTargetAsActive', () => {
  test('Sets the node as activeitem', () => {
    const state = {
      activeItem: null,
    }
    const mockElement = document.createElement('div')

    const mockEvent = {
      currentTarget: mockElement,
    }

    // @ts-ignore
    const nextState = setEventTargetAsActive(state, mockEvent)

    expect(nextState).not.toBe(state)
    expect(nextState.activeItem).toBe(mockElement)
  })

  test('Does not set the activeitem, if target cannot be found', () => {
    const state = {
      activeItem: null,
    }
    const mockEvent = {
      currentTarget: null,
    }

    // @ts-ignore
    const nextState = setEventTargetAsActive(state, mockEvent)

    expect(nextState).toBe(state)
    expect(nextState.activeItem).toBe(null)
  })
})

describe('itemOnMouseEnter', () => {
  test('Sets the event target as activeItem', () => {
    const state = {
      activeItem: null,
    }
    const mockElement = document.createElement('div')

    const mockEvent = {
      currentTarget: mockElement,
    }

    // @ts-ignore
    const nextState = itemOnMouseEnter(state, mockEvent)

    expect(nextState).not.toBe(state)
    expect(nextState.activeItem).toBe(mockElement)
  })
})

describe('itemOnFocus', () => {
  test('Sets the event target as activeItem', () => {
    const state = {
      activeItem: null,
    }
    const mockElement = document.createElement('div')

    const mockEvent = {
      currentTarget: mockElement,
    }

    // @ts-ignore
    const nextState = itemOnFocus(state, mockEvent)

    expect(nextState).not.toBe(state)
    expect(nextState.activeItem).toBe(mockElement)
  })

  test('Fires event.stopPropagation', () => {
    const spy = jest.fn()
    const state = {
      activeItem: null,
    }
    const mockEvent = {
      stopPropagation: spy,
    }

    // @ts-ignore
    itemOnFocus(state, mockEvent)

    expect(spy).toHaveBeenCalled()
  })
})

describe('itemOnClick', () => {
  test('Selects item on click', () => {
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {}

    // @ts-ignore
    itemOnClick(state, mockEvent)

    expect(state.onSelect).toHaveBeenCalledWith('ron', {
      dropdownType: 'hsds-dropdown-v2',
      event: mockEvent,
      item: { value: 'ron' },
    })
  })

  test('Fires event.stopPropagation', () => {
    const spy = jest.fn()
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {
      stopPropagation: spy,
    }

    // @ts-ignore
    itemOnClick(state, mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  test('Does not select item on click, if has sub menu', () => {
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {}

    // @ts-ignore
    itemOnClick(state, mockEvent, { hasSubMenu: true })

    expect(state.onSelect).not.toHaveBeenCalled()
  })

  test('Fires event.stopPropagation, even with subMenu', () => {
    const spy = jest.fn()
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {
      stopPropagation: spy,
    }

    // @ts-ignore
    itemOnClick(state, mockEvent, { hasSubMenu: true })

    expect(spy).toHaveBeenCalled()
  })
})
