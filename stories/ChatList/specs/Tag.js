import { createSpec, faker } from '@helpscout/helix'

export default createSpec({
  color: faker.random.arrayElement([
    'grey', 'red', 'orange', 'green', 'blue'
  ]),
  children: faker.lorem.word()
})
