// Source
// https://github.com/Shopify/javascript-utilities/blob/master/src/other.ts
export function createUniqueIDFactory(prefix = '') {
  const index = createUniqueIndexFactory(1)
  return prefixOverride => {
    const namespace = prefixOverride || prefix || ''

    return `${namespace}${index()}`
  }
}

export function createUniqueIndexFactory(start = 1) {
  let index = typeof start === 'number' ? start : 1
  return () => index++
}
