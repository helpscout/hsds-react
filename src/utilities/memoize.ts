import getShallowDiffs from '@helpscout/react-utils/dist/getShallowDiffs'
import memoize from './memoizeOne'
export { default as memoize } from './memoizeOne'

export const shallowPropMemoizeIsEqual = (a: any, b: any): boolean => {
  return !getShallowDiffs(a[0], b[0]).diffs.length
}

export const memoizeWithProps = fn => memoize(fn, shallowPropMemoizeIsEqual)

export default memoize
