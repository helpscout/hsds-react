import { isDefined } from './is'
import get from './get'

export const isBrowserEnv = (): boolean => {
  
  if (!isDefined(process)) return true
  
  return get(process, 'browser') === true
}

export const isNodeEnv = (): boolean => !isBrowserEnv()

export const isTestEnv = (): boolean => {
  
  const testEnv =
    get(process, 'env.NODE_ENV') || get(process, 'env.BABEL_ENV') || ''

  return testEnv.toLowerCase() === 'test'
}
