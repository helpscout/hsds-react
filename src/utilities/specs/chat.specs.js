import { createSpec, faker } from '@hsds/helix'
import TagSpec from './tags.specs'

export default createSpec({
  id: faker.datatype.uuid(),
  isAssigned: faker.datatype.boolean(),
  isTyping: faker.datatype.boolean(),
  isViewing: faker.datatype.boolean(),
  isWaiting: faker.datatype.boolean(),
  message: faker.lorem.paragraph(),
  name: () => `${faker.name.firstName()()} ${faker.name.lastName()()}`,
  newMessageCount: faker.datatype.number({ min: 0, max: 2 }),
  tags: () => TagSpec.generate(1, 10),
  timestamp: new Date().toISOString(),
})
