import { compose, createSpec, faker } from '@hsds/helix'
import AvatarSpec from './avatar.specs'

const Spec = createSpec({
  status: faker.random.arrayElement(['online', 'offline', 'busy']),
})

export default compose(AvatarSpec, Spec)
