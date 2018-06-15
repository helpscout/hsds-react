import { incrementFocusIndex } from '../../focus'

test('Returns false for invalid arguments', () => {
  expect(incrementFocusIndex()).toBeFalsy()
  expect(incrementFocusIndex(true)).toBeFalsy()
  expect(incrementFocusIndex('up')).toBeFalsy()
  expect(incrementFocusIndex({})).not.toBe(false) // Objects accepted, but filled with defaults

  expect(
    incrementFocusIndex({
      currentIndex: true,
    })
  ).toBeFalsy()

  expect(
    incrementFocusIndex({
      direction: true,
    })
  ).toBeFalsy()

  expect(
    incrementFocusIndex({
      enableCycling: 'yup',
    })
  ).toBeFalsy()

  expect(
    incrementFocusIndex({
      itemCount: 'lots',
    })
  ).toBeFalsy()
})

describe('direction: down', () => {
  test('Increases by up direction within range', () => {
    const o = {
      direction: 'down',
      currentIndex: 4,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(5)
  })

  test('Stops at max', () => {
    const o = {
      direction: 'down',
      currentIndex: 6,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(6)
  })

  test('Handle null currentIndex', () => {
    const o = {
      direction: 'down',
      currentIndex: null,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(0)
  })
})

describe('direction: up', () => {
  test('Increases by up direction within range', () => {
    const o = {
      direction: 'up',
      currentIndex: 4,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(3)
  })

  test('Stops at max', () => {
    const o = {
      direction: 'up',
      currentIndex: 0,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(0)
  })

  test('Handle null currentIndex', () => {
    const o = {
      direction: 'up',
      currentIndex: null,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(0)
  })
})

describe('enableCycling', () => {
  test('Loops when going up', () => {
    const o = {
      direction: 'up',
      enableCycling: true,
      currentIndex: 0,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(6)
  })

  test('Works normally going up, when not looping', () => {
    const o = {
      direction: 'up',
      enableCycling: true,
      currentIndex: 4,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(3)
  })

  test('Handles currentIndex of null when doing up', () => {
    const o = {
      direction: 'up',
      enableCycling: true,
      currentIndex: null,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(0)
  })

  test('Loops when going down', () => {
    const o = {
      direction: 'down',
      enableCycling: true,
      currentIndex: 6,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(0)
  })

  test('Works normally going down, when not looping', () => {
    const o = {
      direction: 'down',
      enableCycling: true,
      currentIndex: 4,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(5)
  })

  test('Handles currentIndex of null when doing down', () => {
    const o = {
      direction: 'down',
      enableCycling: true,
      currentIndex: null,
      itemCount: 6,
    }

    expect(incrementFocusIndex(o)).toBe(0)
  })
})
