import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'

export const getSequenceNames = sequence => {
  let names = []

  if (isArray(sequence)) {
    names = sequence
  }

  if (isString(sequence)) {
    names = sequence
      .trim()
      .split(' ')
      .filter(n => n !== '')
  }

  return names
}
