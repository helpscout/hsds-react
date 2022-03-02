/* istanbul ignore file */
/**
 * This exists to ensure that the imports work correctly.
 */
// Source
// https://github.com/ReactTraining/react-router/blob/3d233bf0b6dd5bf68d9bac9c94273ae25646b207/packages/react-router/modules/matchPath.js
import pathToRegexp from 'path-to-regexp'
import isNil from 'lodash.isnil'
import { createUniqueIDFactory } from '../../utilities/id'

const patternCache = {}
const cacheLimit = 10000
let cacheCount = 0

const compilePath = (pattern, options) => {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {})

  if (cache[pattern]) return cache[pattern]

  const keys = []
  const re = pathToRegexp(pattern, keys, options)
  const compiledPattern = { re, keys }

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern
    cacheCount++
  }

  return compiledPattern
}

/**
 * Public API for matching a URL pathname to a path pattern.
 */
export const matchPath = (pathname, options = {}, parent) => {
  if (typeof options === 'string') options = { path: options }

  const { path, exact = false, strict = false, sensitive = false } = options

  if (isNil(path)) return parent

  const { re, keys } = compilePath(path, { end: exact, strict, sensitive })
  const match = re.exec(pathname)

  if (!match) return null

  const [url, ...values] = match
  const isExact = pathname === url

  if (exact && !isExact) return null

  return {
    path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact, // whether or not we matched exactly
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index]
      return memo
    }, {}),
  }
}

export const setupManager = (namespace = '') => {
  const ns =
    typeof namespace !== 'string' || !namespace.length
      ? createUniqueIDFactory('BlueGlobalManager')()
      : namespace

  window[ns] = window[ns] || []

  // Welcome aboard, Mr. Manager!
  // Wow, I'm Mr. Manager!
  // Well, manager… we we just say manager.
  return {
    data: window[ns],
    add: add(window[ns]),
    remove: remove(window[ns]),
    first: first(window[ns]),
    last: last(window[ns]),
    max: max(window[ns]),
  }
}

export const add = manager => item => {
  manager.push(item)
  return manager
}

export const remove = manager => item => {
  const index = manager.indexOf(item)
  if (index >= 0) {
    manager.splice(index, 1)
  }
  return manager
}

export const first = manager => () => {
  return manager[0]
}

export const last = manager => () => {
  return manager[manager.length - 1]
}

export const max = manager => () => {
  return Math.max.apply(Math, manager)
}
