import { createSpec, faker } from '@hsds/helix'

test('Can generate simple computed values', () => {
  const Computed = createSpec({
    id: faker.datatype.number(),
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
  })

  const name = Computed.seed(1).generate().name.split(' ')

  expect(name.length).toBe(2)
  expect(typeof name[0]).toBe('string')
  expect(typeof name[1]).toBe('string')
})

test('Can generate functional computed values', () => {
  const Computed = createSpec({
    id: faker.datatype.number(),
    name: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
  })

  const name = Computed.seed(1).generate().name.split(' ')

  expect(name.length).toBe(2)
  expect(typeof name[0]).toBe('string')
  expect(typeof name[1]).toBe('string')
})

test('Can generate complex computed values', () => {
  const props = { name: faker.name.firstName() }
  const Computed = createSpec({
    id: faker.datatype.number(),
    name: faker.computed(props)(values => {
      return `${values.name}-123`
    }),
  })

  const name = Computed.seed(1).generate().name

  expect(typeof name).toBe('string')
  expect(name).toContain('-123')
})
