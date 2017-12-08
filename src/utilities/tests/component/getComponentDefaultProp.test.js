import { getComponentDefaultProp } from '../../component'

test('Returns fallback (undefined) if invalid arguments', () => {
  expect(getComponentDefaultProp()).toBe(undefined)
  expect(getComponentDefaultProp(true)).toBe(undefined)
  expect(getComponentDefaultProp(false)).toBe(undefined)
  expect(getComponentDefaultProp('component')).toBe(undefined)
  expect(getComponentDefaultProp(['component'])).toBe(undefined)
  expect(getComponentDefaultProp({a: 1})).toBe(undefined)
})

test('Returns fallback (undefined) if defaultProp does not exist', () => {
  expect(getComponentDefaultProp({a: 1}, 'a')).toBe(undefined)
  expect(getComponentDefaultProp({props: 1}, 'a')).toBe(undefined)
})

test('Returns defaultProp if exists', () => {
  const o = {
    defaultProps: {
      a: 1
    }
  }
  expect(getComponentDefaultProp(o, 'a')).toBe(1)
})

test('Can customize fallback', () => {
  const o = {
    defaultProps: {
      a: 1
    }
  }
  const fallback = 'fallback'

  expect(getComponentDefaultProp(o, 'nope', fallback)).toBe(fallback)
  expect(getComponentDefaultProp(true, 'nope', fallback)).toBe(fallback)
})
