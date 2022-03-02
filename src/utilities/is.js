import isNil from 'lodash.isnil'

// TODO: remove when the rest are removed
export function typeOf(value, type) {
  return !isNil(value) && typeof value === type
}

// TODO: remove
// HS App: site/js/apps/beacons/react/components/Suggestions/Articles.js
export function isFunction(value) {
  return typeOf(value, 'function')
}

// TODO: remove
// Beacon: src/reducers/config.js
export function isNumber(value) {
  return typeOf(value, 'number')
}

// TODO: remove
// HS App:site/js/apps/common/react/HSDropdown/utils.js
export function isString(value) {
  return typeOf(value, 'string')
}
