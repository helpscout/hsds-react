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
    // @ts-ignore
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

  test('Multiselect: add to selection', () => {
    const action = {
      type: actionTypes.SELECT_ITEM,
      payload: {
        selectedItem: '2',
      },
    }
    const nextState = reducer(
      { ...initialState, selectedItem: '0', allowMultipleSelection: true },
      action
    )

    expect(nextState.selectedItem).toEqual(['0', '2'])
    expect(nextState.previousSelectedItem).toBe('0')
  })

  test('Multiselect: remove from selection', () => {
    const action = {
      type: actionTypes.SELECT_ITEM,
      payload: {
        selectedItem: '2',
      },
    }
    const nextState = reducer(
      {
        ...initialState,
        selectedItem: ['0', '2'],
        allowMultipleSelection: true,
      },
      action
    )

    expect(nextState.selectedItem).toEqual(['0'])
    expect(nextState.previousSelectedItem).toEqual(['0', '2'])
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
