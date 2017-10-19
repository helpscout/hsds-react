export const nameToInitials = (name = '') => {
  if (!name || !name.length) return ''

  const words = name.split(' ')
    .map(w => w[0])
    .map(w => w.toUpperCase())

  return words.length === 1 ? words[0] : words[0] + words[words.length - 1]
}

export const isWordString = (word) => {
  return typeof word === 'string' && word.length
}

export const isWord = (word) => {
  return typeof word === 'number' || isWordString(word)
}

export const wordHasSpaces = (word) => {
  return isWordString(word) && word.trim().indexOf(' ') > 0
}
