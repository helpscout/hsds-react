import { createSpec, faker } from '@helpscout/helix'

export default createSpec({
  name: faker.name.firstName(),
  image: faker.image.avatar()
})
