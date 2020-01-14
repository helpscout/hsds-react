import EMOTICONS from './Emoticon.icons'

/**
 * Generates the correct emoticon name to support a couple of legacy names
 * @param {string} name The given emoticon name
 *
 * @returns {string} Supported emoticon name
 */
export function getName(name) {
  switch (name) {
    case 'happy':
    case 'sad':
      return `reaction-${name}`
    case 'meh':
      return `reaction-okay`
    default:
      return name
  }
}

/**
 * Generates the full icon name and returns the SVG icon based on name, size and active status
 * @param {string} emoticonName Desired emoticon
 * @param {string} size Size of the emoticon, default 'md'
 *
 * @returns {string} Emoticon SVG string
 */
export function getIcon(emoticonName, size) {
  return EMOTICONS[`${emoticonName}-${size}`]
}
