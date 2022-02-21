import isString from 'lodash.isstring'

export const getSequenceNames = sequence => {
  let names = []

  if (Array.isArray(sequence)) {
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
