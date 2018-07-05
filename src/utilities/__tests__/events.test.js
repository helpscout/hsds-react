import { isMouseWheelYEvent } from '../events'

describe('isMouseWheelYEvent', () => {
  test('Returns false if X, Y delta coordinates are missing', () => {
    expect(isMouseWheelYEvent()).toBe(false)
    expect(isMouseWheelYEvent({})).toBe(false)
    expect(isMouseWheelYEvent({ delta: 123 })).toBe(false)
  })

  test('Returns false if X delta is anything other than zero', () => {
    // Non-zero deltaX come from diagonal-like movements, which come from
    // trackpad devices or purely horizontal scroll wheels.
    expect(isMouseWheelYEvent({ deltaX: -1, deltaY: 0 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 1, deltaY: 0 })).toBe(false)
    // Horizontal scroll wheel
    expect(isMouseWheelYEvent({ deltaX: 8, deltaY: 0 })).toBe(false)
    // Trackpad scroll wheel
    expect(isMouseWheelYEvent({ deltaX: 1, deltaY: 4 })).toBe(false)
  })

  test('Returns false if Y delta is too small', () => {
    // Smaller y delta values come from minor (vertical) trackpad based
    // movements.
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 12 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 8 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 4 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 1 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -4 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -8 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -12 })).toBe(false)
  })

  test('Returns true if Y delta surpasses threshold', () => {
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -48 })).toBe(true)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -24 })).toBe(true)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 24 })).toBe(true)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 48 })).toBe(true)
  })
})
