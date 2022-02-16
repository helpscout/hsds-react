import isArray from 'lodash.isarray'
import { createSpec, derived, faker } from '@helpscout/helix'

const avatarSpec = createSpec({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  name: derived(({ firstName, lastName }) => `${firstName} ${lastName}`),
  image: faker.image.avatar(),
}).afterGenerate(props => {
  if (isArray(props)) {
    return props.map(prop => {
      return {
        id: prop.id,
        name: prop.name,
        firstName: prop.firstName,
        image: `https://avatars.dicebear.com/api/pixel-art/${prop.id}.svg?mood[]=happy&background=%23E5E9EC`,
      }
    })
  }
  return {
    id: props.id,
    name: props.name,
    image: `https://avatars.dicebear.com/api/pixel-art/${props.id}.svg?mood[]=happy&background=%23E5E9EC`,
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
