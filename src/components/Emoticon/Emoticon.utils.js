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
 * @param {Object} IconProps Object that contains the keys: 'iconName', 'size' and 'isActive'
 *
 * @returns {string} Emoticon SVG string
 */
export function getIcon({ iconName, size, isActive }) {
  const fullName = `${iconName}-${isActive ? 'on' : 'off'}-${size}`
  console.log('fullName', fullName)
  return EMOTICONS[fullName]
}
