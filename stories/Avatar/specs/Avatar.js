import { createSpec, derived, faker } from '@helpscout/helix'

export default createSpec({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  name: derived(({ firstName, lastName }) => `${firstName} ${lastName}`),
  image: faker.image.avatar()
})
