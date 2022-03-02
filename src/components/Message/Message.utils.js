import isString from 'lodash.isstring'

export const isWord = word => {
  return typeof word === 'number' || isWordString(word)
}

export const isWordString = word => {
  return !!(isString(word) && word.length)
}

export const textIncludesOnlyEmoji = text => {
  // Note: `\u2028`& `\uFE0F` are not emoji characters, but instead unicode line
  // separators that seem to appear when the `replace` methods are called below.
  const emojiPattern = /(\u2028|\uFE0F|\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

  if (!isWordString(text)) return false

  // Remove all emoji and see if any characters remain
  const withEmojisRemoved = text.replace(emojiPattern, '')

  // Remove spaces
  const withSpacesRemoved = withEmojisRemoved.replace(/[\s\n]/gm, '')

  return !withSpacesRemoved
}
