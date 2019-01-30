import { isModifierKeyPressed } from '../keys'

describe('isModifierKeyPressed', () => {
  test('return true if ctrl is pressed', () => {
    const event = {
      altKey: false,
      ctrlKey: true,
      metaKey: false,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return true if altKey is pressed', () => {
    const event = {
      altKey: true,
      ctrlKey: false,
      metaKey: false,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return true if altKey is pressed', () => {
    const event = {
      altKey: false,
      ctrlKey: false,
      metaKey: true,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return false if all modifier keys are false', () => {
    const event = {
      altKey: false,
      ctrlKey: false,
      metaKey: false,
    }
    expect(isModifierKeyPressed(event)).toBe(false)
  })
})
