import {
  getFadeLeftStyles
} from '../../scrollFade'

test('Has offset by default', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 40
  }
  const transform = getFadeLeftStyles({ currentTarget })

  expect(transform).toBe('scaleX(1)')
})

test('Can handle 0 offset', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 1
  }
  const transform = getFadeLeftStyles({ currentTarget }, 0)

  expect(transform).toBe('scaleX(1)')
})

test('Applies max-scale if scrolled enough', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 30
  }
  const offset = 28
  const transform = getFadeLeftStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleX(1)')
})

test('Applies correct scale if scrolled', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 5
  }
  const offset = 28
  const transform = getFadeLeftStyles({ currentTarget }, offset)
  const amount = currentTarget.scrollLeft / offset

  expect(transform).toContain(amount)
})

test('Applies 0 scale if not scrolled', () => {
  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 0
  }
  const offset = 28
  const transform = getFadeLeftStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleX(0)')
})
