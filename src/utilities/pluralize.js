/* istanbul ignore file */

// TODO: remove. Move to HSApp (site/js/apps/mailbox/chat/ChatApp/src/components/ChatSidebar/ChatSidebar.js)
/**
 * A super tiny, but naive, way to pluralize a word based on a count value.
 * @param word {string} The word to pluralize.
 * @param count {number} The count to check against.
 * @returns {string} The pluralized word.
 */
export default function pluralize(word, count = 1) {
  if (!word) return ''
  if (word.lastIndexOf('s') === word.length - 1) return word
  return count === 1 ? word : `${word}s`
}
