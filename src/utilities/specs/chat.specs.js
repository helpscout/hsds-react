import { createSpec, faker } from '@helpscout/helix'
import TagSpec from './tags.specs'

export default createSpec({
  id: faker.datatype.uuid(),
  isAssigned: faker.random.boolean(),
  isTyping: faker.random.boolean(),
  isViewing: faker.random.boolean(),
  isWaiting: faker.random.boolean(),
  message: faker.lorem.paragraph(),
  name: () => `${faker.name.firstName()()} ${faker.name.lastName()()}`,
  newMessageCount: faker.datatype.number({ min: 0, max: 2 }),
  tags: () => TagSpec.generate(1, 10),
  timestamp: new Date().toISOString(),
})
