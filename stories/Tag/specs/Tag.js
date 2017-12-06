import { createSpec, faker } from '@helpscout/helix'

const Spec = createSpec({
  color: faker.random.arrayElement([
    'blue',
    'green',
    'grey',
    'orange',
    'purple',
    'red'
  ]),
  id: faker.random.uuid(),
  filled: faker.random.boolean(),
  value: faker.lorem.word()
})

export default Spec
