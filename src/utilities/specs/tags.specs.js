import { createSpec, faker } from '@helpscout/helix'

export default createSpec({
  color: faker.random.arrayElement([
    'blue',
    'green',
    'grey',
    'orange',
    'purple',
    'red',
  ]),
  id: faker.datatype.uuid(),
  filled: faker.datatype.boolean(),
  value: faker.lorem.sentence(),
  children: faker.lorem.word(),
})

export const SelectingSpec = createSpec({
  color: faker.random.arrayElement([
    'blue',
    'green',
    'grey',
    'orange',
    'purple',
    'red',
  ]),
  id: faker.datatype.uuid(),
  value: faker.lorem.word(),
})
