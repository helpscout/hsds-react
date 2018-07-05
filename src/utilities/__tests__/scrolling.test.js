import { remapScrollingPlane } from '../scrolling'

describe('remapScrollingPlane', () => {
  test('Adjusts scrollLeft based on deltaY value', () => {
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: () => null,
    }
    remapScrollingPlane(event)

    expect(event.currentTarget.scrollLeft).toBe(40)
  })

  test('Does not adjusts scrollLeft, if scroll may not come from a mouse wheel', () => {
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 10,
      target: {
        shiftKey: false,
      },
      preventDefault: () => null,
    }
    remapScrollingPlane(event)

    expect(event.currentTarget.scrollLeft).toBe(0)
  })

  test('Does not adjusts scrollLeft based on deltaY value, if shiftKey is pressed', () => {
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: true,
      },
      preventDefault: () => null,
    }
    remapScrollingPlane(event)

    expect(event.currentTarget.scrollLeft).toBe(0)
  })

  test('Does not adjust scrollLeft if deltaX is more than deltaY', () => {
    const spy = jest.fn()
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 41,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: spy,
    }
    remapScrollingPlane(event)

    expect(spy).not.toHaveBeenCalled()
    expect(event.currentTarget.scrollLeft).toBe(0)
  })

  test('Calls preventDefault on successful scroll', () => {
    const spy = jest.fn()
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: spy,
    }
    remapScrollingPlane(event)

    expect(spy).toHaveBeenCalled()
  })

  test('Does not call preventDefault if node is missing', () => {
    const spy = jest.fn()
    const event = {
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: spy,
    }
    remapScrollingPlane(event)

    expect(spy).not.toHaveBeenCalled()
  })
})
