import { createSpec, faker } from '@hsds/helix'

test('Can create and generate a spec', () => {
  const Spec = createSpec({
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })

  const fixture = Spec.generate()

  expect(typeof fixture.id).toBe('number')
  expect(typeof fixture.firstName).toBe('string')
  expect(typeof fixture.lastName).toBe('string')
})

test('Can seed fixture results', () => {
  const Spec = createSpec({
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })

  const one = Spec.seed(1).generate()
  const two = Spec.seed(2).generate()
  const three = Spec.seed(1).generate()

  expect(one.id).not.toBe(two.id)
  expect(two.id).not.toBe(three.id)
  expect(three.id).toBe(one.id)
})
