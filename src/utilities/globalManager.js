import { createUniqueIDFactory } from './id'

export const setupManager = (namespace = '') => {
  const ns = (typeof namespace !== 'string' || !namespace.length)
  ? createUniqueIDFactory('BlueGlobalManager')() : namespace

  window[ns] = window[ns] || []

  // Welcome aboard, Mr. Manager!
  // Wow, I'm Mr. Manager!
  // Well, manager… we we just say manager.
  return {
    data: window[ns],
    add: add(window[ns]),
    remove: remove(window[ns]),
    first: first(window[ns]),
    last: last(window[ns])
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
