export const isString = string => {
  return typeof string === 'string'
}

export const nameToInitials = (name = '') => {
  // Returning early if undefined to avoid casting undefined to "undefined"
  if (!name) {
    return ''
  }

  // Trim trailing whitespace
  name = (name + '').trim()
  if (!name.length) {
    return ''
  }

  const words = name
    .split(' ')
    .filter(w => w !== '')
    .map(w => w[0])
    .map(w => w.toUpperCase())

  return words.length === 1 ? words[0] : words[0] + words[words.length - 1]
}

export const isWordString = word => {
  return isString(word) && word.length
}

export const isWord = word => {
  return typeof word === 'number' || isWordString(word)
}

export const wordHasSpaces = word => {
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
    frontLen >= wordLen ||
    backLen >= wordLen ||
    frontLen + backLen >= wordLen
  ) {
    return word
  } else if (backLen === 0) {
    return word.slice(0, frontLen) + truncateStr
  } else {
    return word.slice(0, frontLen) + truncateStr + word.slice(wordLen - backLen)
  }
}

export const stripUrlPrefix = url => {
  if (!isString(url)) return url
  return url.replace(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/g,
    ''
  )
}

export const newlineToHTML = string => {
  return string.trim().replace(/\r?\n/g, '<br>')
}
