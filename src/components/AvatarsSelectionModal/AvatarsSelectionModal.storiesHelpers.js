import { createSpec, derived, faker } from '@helpscout/helix'

const roles = ['administrator', 'account owner', 'user']

const avatarUserSpec = createSpec({
  id: faker.datatype.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  fullName: derived(({ firstName, lastName }) => `${firstName} ${lastName}`),
  initials: derived(
    ({ firstName, lastName }) => `${firstName[0]}${lastName[0]}`
  ),
  photo: faker.image.avatar(),
  role: faker.helpers.randomize(roles),
})

export const exampleAvatarsUsers = avatarUserSpec.generate(20)
