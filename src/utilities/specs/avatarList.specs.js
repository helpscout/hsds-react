import { compose, createSpec, faker } from '@helpscout/helix'
import AvatarSpec from './avatar.specs'

const Spec = createSpec({
  status: faker.random.arrayElement(['online', 'offline', 'busy']),
})

export default compose(AvatarSpec, Spec)
