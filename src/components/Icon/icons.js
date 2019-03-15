const isBeaconEnv = process && process.env['BEACON_ENV']

let icons

if (isBeaconEnv) {
  icons = require('./icons.beacon').default
} else {
  icons = require('./icons.all').default
}

export default icons
