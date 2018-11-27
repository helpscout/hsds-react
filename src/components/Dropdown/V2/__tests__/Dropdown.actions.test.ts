// @ts-ignore
import {
  setMenuNode,
  setTriggerNode,
  changeDirection,
  toggleOpen,
  openDropdown,
  closeDropdown,
  onSelect,
} from '../Dropdown.actions'
import { SELECTORS } from '../Dropdown.utils'

// describe('setActiveItem', () => {
//   test('Updates the state with the activeItem DOM node', () => {
//     const state = {
//       activeItem: null,
//       activeIndex: null,
//       activeValue: null,
//       activeId: null,
//       id: 'ron',
//     }

//     const activeItem = document.createElement('div')
//     activeItem.setAttribute(SELECTORS.indexAttribute, '123')
//     activeItem.setAttribute(SELECTORS.valueAttribute, 'Hello')

//     const nextState = setActiveItem(state, activeItem)

//     expect(nextState).not.toEqual(state)
//     expect(nextState.activeItem).toBe(activeItem)
//     expect(nextState.activeIndex).toBe('123')
//     expect(nextState.activeValue).toBe('Hello')
//     expect(nextState.activeId).toContain('ron')
//   })

//   test('Guarded from updated state if activeItem is the same', () => {
//     const mockActiveItem = document.createElement('div')
//     const state = {
//       activeItem: mockActiveItem,
//       activeIndex: null,
//       activeValue: null,
//       activeId: null,
//       id: 'ron',
//     }

//     const nextState = setActiveItem(state, mockActiveItem)

//     expect(nextState).toBeFalsy()
//   })
// })

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

  test('Returns falsy to prevent unnecessary setState for invalid props', () => {
    const state = {
      items: [{ value: 'ron' }, { value: 'brick' }],
      activeValue: 'ron',
      onSelect: jest.fn(),
    }

    const mockEvent = {}

    const nextState = onSelect(state, mockEvent)

    expect(nextState).toBeFalsy()
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

    expect(nextState).not.toBeFalsy()
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

    expect(nextState).toBeFalsy()
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

  test('Does not fire onSelect if item is disabled', () => {
    const spy = jest.fn()
    const state = {
      items: [{ value: 'champ', disabled: true }, { value: 'brick' }],
      activeValue: 'champ',
      onSelect: spy,
    }

    const mockEvent = {}

    const nextState = onSelect(state, mockEvent)

    expect(spy).not.toHaveBeenCalled()
    expect(nextState).toBeFalsy()
  })
})
