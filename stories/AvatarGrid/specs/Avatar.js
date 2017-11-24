import { compose, createSpec, faker } from '@helpscout/helix'
import AvatarSpec from '../../Avatar/specs/Avatar'

const Spec = createSpec({
  status: faker.random.arrayElement(['online', 'offline', 'busy'])
})

export default compose(AvatarSpec, Spec)
