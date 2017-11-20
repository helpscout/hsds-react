import {
  getFadeTopStyles
} from '../../scrollFade'

test('Has offset by default', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 30
  }
  const transform = getFadeTopStyles({ currentTarget })

  expect(transform).toBe('scaleY(1)')
})

test('Can handle 0 offset', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 1
  }
  const transform = getFadeTopStyles({ currentTarget }, 0)

  expect(transform).toBe('scaleY(1)')
})

test('Applies max-scale if scrolled enough', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 30
  }
  const offset = 28
  const transform = getFadeTopStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleY(1)')
})

test('Applies correct scale if scrolled', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 5
  }
  const offset = 28
  const transform = getFadeTopStyles({ currentTarget }, offset)
  const amount = currentTarget.scrollTop / offset

  expect(transform).toContain(amount)
})

test('Applies 0 scale if not scrolled', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 0
  }
  const offset = 28
  const transform = getFadeTopStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleY(0)')
})
