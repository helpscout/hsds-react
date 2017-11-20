import {
  getFadeRightStyles
} from '../../scrollFade'

test('Has offset by default', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 40
  }
  const transform = getFadeRightStyles({ currentTarget })

  expect(transform).toBe('scaleX(1)')
})

test('Can handle 0 offset', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 1
  }
  const transform = getFadeRightStyles({ currentTarget }, 0)

  expect(transform).toBe('scaleX(1)')
})

test('Applies max-scale if scrolled enough', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 30
  }
  const offset = 28
  const transform = getFadeRightStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleX(1)')
})

test('Applies correct scale if scrolled', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 80
  }
  const offset = 28
  const transform = getFadeRightStyles({ currentTarget }, offset)

  expect(transform).not.toBe('scaleX(0)')
  expect(transform).not.toBe('scaleX(1)')
})

test('Applies 0 scale if not scrolled', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 100
  }
  const offset = 28
  const transform = getFadeRightStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleX(0)')
})
