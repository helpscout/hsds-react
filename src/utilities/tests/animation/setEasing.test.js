import { setEasing } from '../../animation'

const defaultEasing = 'easeInOutBack'
const defaultOpacityEasing = 'linear'

test('Returns default easing for non-valid arguments', () => {
  expect(setEasing()).toBe(defaultEasing)
  expect(setEasing('ease')).toBe(defaultEasing)
  expect(setEasing(0)).toBe(defaultEasing)
  expect(setEasing([])).toBe(defaultEasing)
})

test('Returns desired easing, if set', () => {
  const easing = {
    easing: 'ease'
  }

  expect(setEasing(easing)).toBe('ease')
})

test('Returns opacity easing, if opacity is defined', () => {
  const easing = {
    opacity: 0
  }

  expect(setEasing(easing)).toBe(defaultOpacityEasing)
})

test('Returns default easing, if easing key is undefined', () => {
  const easing = {
    width: 0
  }

  expect(setEasing(easing)).toBe(defaultEasing)
})
