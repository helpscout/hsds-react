import { isBeaconEnv } from '../../utilities/env'

if (isBeaconEnv()) {
  require('./icons.beacon')
} else {
  require('./icons.all')
}
