import { applyActionWithState } from './Dropdown.utils'

describe('applyActionWithState', () => {
  test('Can enhance an action with state', () => {
    const spy = jest.fn()
    const mockEvent = {
      preventDefault: spy,
    }

    const mockState = { a: 0 }

    const action = (state, event) => {
      event && event.preventDefault()

      return {
        ...state,
        a: state.a + 1,
      }
    }

    const enhancedAction = applyActionWithState(mockState)(action)

    const nextState = enhancedAction(mockEvent)

    expect(spy).toHaveBeenCalled()
    expect(nextState.a).toBe(1)
  })
})
