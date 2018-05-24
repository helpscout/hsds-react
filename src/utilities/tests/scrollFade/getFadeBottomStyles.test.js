import { getFadeBottomStyles } from '../../scrollFade'

test('Has offset by default', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 1,
  }
  const transform = getFadeBottomStyles({ currentTarget })

  expect(transform).toBe('scaleY(1)')
})

test('Can handle 0 offset', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 99,
  }
  const transform = getFadeBottomStyles({ currentTarget }, 0)

  expect(transform).toBe('scaleY(1)')
})

test('Applies max-scale if not scrolled enough', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 1,
  }
  const offset = 28
  const transform = getFadeBottomStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleY(1)')
})

test('Applies correct scale if scrolled', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 80,
  }
  const offset = 28
  const transform = getFadeBottomStyles({ currentTarget }, offset)

  expect(transform).not.toBe('scaleY(0)')
  expect(transform).not.toBe('scaleY(1)')
})

test('Applies 0 scale if scrolled max', () => {
  const currentTarget = {
    clientHeight: 100,
    scrollHeight: 200,
    scrollTop: 110,
  }
  const offset = 28
  const transform = getFadeBottomStyles({ currentTarget }, offset)

  expect(transform).toBe('scaleY(0)')
})
