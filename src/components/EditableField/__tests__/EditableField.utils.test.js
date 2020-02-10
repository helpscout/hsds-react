import { getValidationColor, COLOURS } from '../EditableField.utils'

describe('setFocusIndicatorColor', () => {
  test('should return default color if no valid type passed', () => {
    expect(getValidationColor()).toBe(COLOURS.states.default)
  })

  test('should return error color if error type passed', () => {
    expect(getValidationColor({ type: 'error' })).toBe(COLOURS.states.error)
  })

  test('should return custom color if color passed', () => {
    expect(getValidationColor({ color: 'plum' })).toBe('plum')
  })
})
