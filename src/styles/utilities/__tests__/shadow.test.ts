import { getShadow, defaultShadow } from '../shadow'
import shadows from '../../configs/shadows'

test('Defaults to transparent', () => {
  expect(getShadow()).toBe(defaultShadow)
})

test('Can get the correct shadow value', () => {
  expect(getShadow(100)).toBe(shadows['100'])
  expect(getShadow(150)).toBe(shadows['150'])
  expect(getShadow('900')).toBe(shadows['900'])
})

test('Falls back to transparent for invalid shadow value', () => {
  expect(getShadow(123)).toBe(defaultShadow)
})
