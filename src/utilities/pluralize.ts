/**
 * A super tiny, but naive, way to pluralize a word based on a count value.
 * @param word {string} The word to pluralize.
 * @param count {number} The count to check against.
 * @returns {string} The pluralized word.
 */
export default function pluralize(word: string, count: number = 1): string {
  if (!word) return ''
  return count === 1 ? word : `${word}s`
}
