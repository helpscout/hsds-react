import { includes } from '../../utilities/arrays'

/**
 * Get the total number of lines (rows) of a textarea
 *
 * @param   {InputNode} textarea
 * @returns {number}
 */
export const getTextAreaLineTotal = textarea => {
  if (!textarea) return 0
  return textarea.value.split(/\r*\n/).length
}

/**
 * Get the current line (row) of the textarea based on cursor position.
 *
 * @param   {InputNode} textarea
 * @returns {number}
 */
export const getTextAreaLineCurrent = textarea => {
  if (!textarea) return 0

  return textarea.value.substr(0, textarea.selectionStart).split('\n').length
}

/**
 * Moves the cursor caret to the end of the Input value
 * Source: https://css-tricks.com/snippets/javascript/move-cursor-to-end-of-input/
 *
 * @param   {InputNode} inputNode
 */

export const moveCursorToEnd = input => {
  // Extra failsafe guard
  if (!input) return
  if (typeof input.selectionStart === 'number') {
    input.selectionStart = input.selectionEnd = input.value.length
  } else if (typeof input.createTextRange !== 'undefined') {
    input.focus()

    let range = input.createTextRange()
    range.collapse(false)
    range.select()
  }
}

/**
 * Check to see if Node is a textarea.
 *
 * @param   {HTMLElement} node
 * @returns {boolean}
 */
export function isTextArea(node) {
  return !!(node && node.tagName === 'TEXTAREA')
}

export function isStateful(props) {
  return props.state && includes(['error', 'success', 'warning'], props.state)
}

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
