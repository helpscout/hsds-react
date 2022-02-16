/* istanbul ignore file */
import isNil from 'lodash.isnil'
import get from './get'

export const isBrowserEnv = () => {
  if (isNil(process)) return true

  return get(process, 'browser') === true
}

export const isNodeEnv = () => !isBrowserEnv()

export const isTestEnv = () => {
  const testEnv =
    get(process, 'env.NODE_ENV') || get(process, 'env.BABEL_ENV') || ''

  return testEnv.toLowerCase() === 'test'
}
