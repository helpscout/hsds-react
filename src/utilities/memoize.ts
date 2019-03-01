import memoize from './memoize-one'
import getShallowDiffs from '@helpscout/react-utils/dist/getShallowDiffs'

export const shallowPropMemoizeIsEqual = (a: any, b: any): boolean => {
  return !getShallowDiffs(a[0], b[0]).diffs.length
}

export const memoizeWithProps = fn => memoize(fn, shallowPropMemoizeIsEqual)
