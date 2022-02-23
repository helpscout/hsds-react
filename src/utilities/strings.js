import { normalizeUrl } from './urls'

export const newlineToHTML = string => {
  if (!string) {
    return ''
  }

  return string.trim().replace(/\r?\n/g, '<br>')
}

// TODO: Remove, used in Beacon (src/constants/UI.Layers.js)
/**
 * Fast way to repeat a string character.
 * @param   {string} pattern
 * @param   {number} count
 * @returns {string}
 */
export const repeat = (pattern, count) => {
  if (count < 1) return ''
  let result = ''
  while (count > 1) {
    if (count & 1) {
      result += pattern
    }
    count >>= 1

    if (count <= 0) break
    pattern += pattern
  }

  return result + pattern
}

// Taken from the React escapeTextForBrowser internal utility
const escapeHtmlRegExp = /["'&<>]/

/**
 * Escape HTML special characters in the string for output in the browser.
 *
 * @param {string} string
 * @returns {string}
 */
export const escapeHTML = string => {
  if (!string) {
    return ''
  }

  const match = escapeHtmlRegExp.exec(string)

  if (!match) {
    return string
  }

  let escape
  let html = ''
  let index
  let lastIndex = 0

  for (index = match.index; index < string.length; index++) {
    switch (string.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#x27;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += string.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + string.substring(lastIndex, index) : html
}

/**
 * The string form of a regular expression that would match all of the
 * letters, combining marks, and decimal number chars in the unicode character
 * set within a URL.
 */
const alphaNumericAndMarksChars = 'a-z0-9\\-+&@#/%=~_'

/**
 * Partial regex pattern to match the TLD of a domain.
 *
 * Maximum length for a TLD is currently 24 characters.
 * See: as shown in http://data.iana.org/TLD/tlds-alpha-by-domain.txt
 */
const tldPattern = '[a-z]{2,24}'

/**
 * Partial regex pattern to match the domain part of a URL without the subdomain.
 */
const domainPattern = '[a-z0-9-]+\\.' + tldPattern

/**
 * Partial regex pattern to match the path of a URL.
 */
const pathPattern =
  '(?:[/?#](?:[' +
  alphaNumericAndMarksChars +
  "\\(\\)|'$*\\[\\]?!:,.;]*[" +
  alphaNumericAndMarksChars +
  "|'$*\\[\\]])?)?)"

/**
 * Regex pattern to match a complete URL.
 */
const urlPattern =
  '(?:(?:(?:https?:\\/\\/(?:[a-z0-9-]+\\.)*)|(?:[a-z0-9-]+\\.)+)?' +
  domainPattern +
  pathPattern

/**
 * Regex pattern to match an email address.
 */
const emailPattern = "(?:\\b[a-z0-9._'%+-]+@[a-z0-9.-]+\\." + tldPattern + ')'

/**
 * @param {string} string
 *
 * @returns {string}
 */
export const convertLinksToHTML = string => {
  if (!string) {
    return ''
  }

  return string
    .split(new RegExp(`(${urlPattern}|${emailPattern})`, 'gi'))
    .reduce((accumulator, value, index) => {
      if (index % 2) {
        if (value.match(new RegExp(`^${emailPattern}$`, 'i'))) {
          // Matched an email
          return (
            accumulator +
            `<a href="mailto:${escapeHTML(value)}">${escapeHTML(value)}</a>`
          )
        }

        // Matched a URL
        let url = value

        if (url.match(new RegExp(`^${domainPattern}$`, 'i'))) {
          // Only matched a domain name (without subdomain)
          // Skip this as it could be the end/start of a sentence without whitespace.
          // For example with "Hello Tom.how are you?" we should not match "Tom.how"
          return accumulator + url
        }

        // Add http as the default scheme if needed
        url = normalizeUrl(url)

        // Adding target blank and rel noopener for external links
        // See: https://developers.google.com/web/tools/lighthouse/audits/noopener
        return (
          accumulator +
          `<a href="${escapeHTML(
            url
          )}" target="_blank" rel="noopener">${escapeHTML(value)}</a>`
        )
      }

      return accumulator + escapeHTML(value)
    }, '')
}
