import { createSpec, derived, faker } from '@helpscout/helix'

export default createSpec({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  name: derived(({ firstName, lastName }) => `${firstName} ${lastName}`),
  image: faker.image.avatar()
}).afterGenerate(props => {
  if (Array.isArray(props)) {
    return props.map(prop => {
      return {
        name: prop.name,
        image: prop.image
      }
    })
  }
  return {
    name: props.name,
    image: props.image
  }
})
