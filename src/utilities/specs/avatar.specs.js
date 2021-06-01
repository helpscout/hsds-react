import { createSpec, derived, faker } from '@helpscout/helix'

export default createSpec({
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
