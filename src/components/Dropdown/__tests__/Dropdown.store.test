import { initialState, dispatch } from '../Dropdown.store'
import actionTypes from '../Dropdown.actionTypes'

describe('initialState', () => {
  test('shouldDropDirectionUpdate should resolve to true', () => {
    expect(initialState.shouldDropDirectionUpdate()).toBe(true)
  })
})

describe('dispatch', () => {
  test('Can update state', () => {
    let nextState = dispatch(undefined, {
      type: actionTypes.OPEN_DROPDOWN,
    })

    expect(nextState.isOpen).toBe(true)

    nextState = dispatch(undefined, {
      type: actionTypes.CLOSE_DROPDOWN,
    })

    expect(nextState.isOpen).toBe(false)
  })

  test('Does not modify state if action is undefined', () => {
    const firstState = dispatch(undefined, {
      type: actionTypes.OPEN_DROPDOWN,
    })

    const secondState = dispatch(firstState)

    expect(firstState).toEqual(secondState)
  })
})
