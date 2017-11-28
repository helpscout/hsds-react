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

// Source
// https://github.com/kahwee/truncate-middle
export const truncateMiddle = (word, startLen, endLen, ellip) => {
  if (!isWordString(word)) {
    return ''
  }
  const wordLen = word.length
  // Setting default values
  const frontLen = ~~startLen // will cast to integer
  const backLen = ~~endLen
  const truncateStr = ellip !== undefined ? ellip : '…'

  if (
    (frontLen === 0 && backLen === 0) ||
    (frontLen >= wordLen) ||
    (backLen >= wordLen) ||
    ((frontLen + backLen) >= wordLen)
  ) {
    return word
  } else if (backLen === 0) {
    return word.slice(0, frontLen) + truncateStr
  } else {
    return word.slice(0, frontLen) + truncateStr + word.slice(wordLen - backLen)
  }
}
