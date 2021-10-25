import { createSpec, derived, faker } from '@helpscout/helix'

const avatarSpec = createSpec({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  name: derived(({ firstName, lastName }) => `${firstName} ${lastName}`),
  image: faker.image.avatar(),
}).afterGenerate(props => {
  if (Array.isArray(props)) {
    return props.map(prop => {
      return {
        id: prop.id,
        name: prop.name,
        firstName: prop.firstName,
        image: prop.image,
      }
    })
  }
  return {
    id: props.id,
    name: props.name,
    image: props.image,
  }
})

export function generateAvatarList(number, withTooltip) {
  const avatars = avatarSpec.generate(number)

  if (withTooltip) {
    return avatars.map(av => ({
      tooltipProps: { title: `Hello ${av.firstName}!` },
      ...av,
    }))
  }

  return avatars
}

export default avatarSpec
