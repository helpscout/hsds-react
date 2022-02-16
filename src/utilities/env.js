/* istanbul ignore file */
import { isDefined } from './is'
import get from 'lodash.get'

export const isBrowserEnv = () => {
  if (!isDefined(process)) return true

  return get(process, 'browser') === true
}

export const isNodeEnv = () => !isBrowserEnv()

export const isTestEnv = () => {
  const testEnv =
    get(process, 'env.NODE_ENV') || get(process, 'env.BABEL_ENV') || ''

  return testEnv.toLowerCase() === 'test'
}
