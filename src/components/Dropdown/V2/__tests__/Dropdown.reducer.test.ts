import reducer from '../Dropdown.reducer'
import { initialState } from '../Dropdown.store'
import actionTypes from '../Dropdown.actionTypes'

describe('reducer', () => {
  test('Can update state from actionType', () => {
    const action = {
      type: actionTypes.OPEN_DROPDOWN,
    }
    const nextState = reducer({ ...initialState, isOpen: false }, action)

    expect(nextState.isOpen).toBe(true)
  })

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
