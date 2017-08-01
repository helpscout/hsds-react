export function noop () {}

// Source
// https://github.com/Shopify/javascript-utilities/blob/master/src/other.ts
export function createUniqueIDFactory (prefix = '') {
  let index = 1
  return () => `${prefix}${index++}`
}
