import reducer from '../Dropdown.reducer'
import { initialState } from '../Dropdown.store'
import actionTypes from '../Dropdown.actionTypes'

describe('State', () => {
  test('Can update state from actionType', () => {
    const action = {
      type: actionTypes.OPEN_DROPDOWN,
    }
    const nextState = reducer({ ...initialState, isOpen: false }, action)

    expect(nextState.isOpen).toBe(true)
  })

  test('Returns initialState by default', () => {
    const nextState = reducer()

    expect(nextState).toEqual(initialState)
  })

  test('Returns state, for no action', () => {
    const nextState = reducer(initialState, {})

    expect(nextState).toEqual(initialState)
  })
})

describe('StateReducer', () => {
  test('Passes state through stateReducer', () => {
    const spy = jest.fn()
    const mockStateReducer = (state, action) => {
      spy(state, action)
      return state
    }
    const action = {
      type: actionTypes.OPEN_DROPDOWN,
    }
    const nextState = reducer(
      { ...initialState, isOpen: false, stateReducer: mockStateReducer },
      action
    )

    expect(nextState.isOpen).toBe(true)
    expect(spy).toHaveBeenCalled()
  })

  test('Can change state via stateReducer', () => {
    const interceptingStateReducer = (state, action) => {
      return { ...state, isOpen: 'indeed!' }
    }
    const action = {
      type: actionTypes.OPEN_DROPDOWN,
    }
    const nextState = reducer(
      {
        ...initialState,
        isOpen: false,
        stateReducer: interceptingStateReducer,
      },
      action
    )

    expect(nextState.isOpen).toBe('indeed!')
  })
})

describe('Mount', () => {
  test('Can menu mount to true', () => {
    const action = {
      type: actionTypes.MENU_MOUNT,
    }
    const nextState = reducer({ ...initialState, isOpen: false }, action)

    expect(nextState.isMounted).toBe(true)
  })

  test('Can menu mount to false', () => {
    const action = {
      type: actionTypes.MENU_UNMOUNT,
    }
    const nextState = reducer({ ...initialState, isOpen: false }, action)

    expect(nextState.isMounted).toBe(false)
  })
})

describe('FocusItem', () => {
  test('Can focus an item index', () => {
    const action = {
      type: actionTypes.FOCUS_ITEM,
      payload: {
        index: '2',
      },
    }
    const nextState = reducer({ ...initialState, index: '0' }, action)

    expect(nextState.index).toBe('2')
    expect(nextState.previousIndex).toBe('0')
  })
})

describe('ClearSelection', () => {
  test('Closes on select, if specified', () => {
    const action = {
      type: actionTypes.CLEAR_SELECTION,
      payload: {
        selectedItem: '',
      },
    }

    const nextState = reducer(
      {
        ...initialState,
        isOpen: true,
        closeOnSelect: true,
        selectedItem: ['hello', 'hola'],
      },
      action
    )

    expect(nextState.selectedItem).toBe('')
    expect(nextState.previousSelectedItem).toEqual(['hello', 'hola'])
    expect(nextState.isOpen).toBe(false)
  })
})

describe('SelectItem', () => {
  test('Can select an item index', () => {
    const action = {
      type: actionTypes.SELECT_ITEM,
      payload: {
        selectedItem: '2',
      },
    }
    const nextState = reducer({ ...initialState, selectedItem: '0' }, action)

    expect(nextState.selectedItem).toBe('2')
    expect(nextState.previousSelectedItem).toBe('0')
  })

  test('Closes on select, if specified', () => {
    const action = {
      type: actionTypes.SELECT_ITEM,
      payload: {
        selectedItem: '2',
      },
    }
    const nextState = reducer(
      { ...initialState, isOpen: true, closeOnSelect: true, selectedItem: '0' },
      action
    )

    expect(nextState.selectedItem).toBe('2')
    expect(nextState.previousSelectedItem).toBe('0')
    expect(nextState.isOpen).toBe(false)
  })

  test('Stays open on select, if specified', () => {
    const action = {
      type: actionTypes.SELECT_ITEM,
      payload: {
        selectedItem: '2',
      },
    }
    const nextState = reducer(
      {
        ...initialState,
        isOpen: true,
        closeOnSelect: false,
        selectedItem: '0',
      },
      action
    )

    expect(nextState.selectedItem).toBe('2')
    expect(nextState.previousSelectedItem).toBe('0')
    expect(nextState.isOpen).toBe(true)
  })
})

describe('UpdateItem', () => {
  test('Can updated a selected item', () => {
    const action = {
      type: actionTypes.UPDATE_SELECTED_ITEM,
      payload: {
        selectedItem: '2',
      },
    }
    const nextState = reducer({ ...initialState, selectedItem: '0' }, action)

    expect(nextState.selectedItem).toBe('2')
    expect(nextState.previousSelectedItem).toBe('0')
  })
})
