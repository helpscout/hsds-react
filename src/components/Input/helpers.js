// @flow

type InputNode =
  | HTMLDivElement
  | HTMLElement
  | HTMLInputElement
  | HTMLTextAreaElement
  | null

/**
 * Get the total number of lines (rows) of a textarea
 *
 * @param   {InputNode} textarea
 * @returns {number}
 */
export const getTextAreaLineTotal = (textarea: InputNode): number => {
  if (!textarea) return 0
  return textarea.value.split(/\r*\n/).length
}

/**
 * Get the current line (row) of the textarea based on cursor position.
 *
 * @param   {InputNode} textarea
 * @returns {number}
 */
export const getTextAreaLineCurrent = (textarea: InputNode): number => {
  if (!textarea) return 0
  return textarea.value.substr(0, textarea.selectionStart).split('\n').length
}

/**
 * Moves the cursor caret to the end of the Input value
 * Source: https://css-tricks.com/snippets/javascript/move-cursor-to-end-of-input/
 *
 * @param   {InputNode} inputNode
 */
export const moveCursorToEnd = (inputNode: InputNode) => {
  if (typeof inputNode.selectionStart === 'number') {
    inputNode.selectionStart = inputNode.selectionEnd = inputNode.value.length
  } else if (typeof inputNode.createTextRange !== 'undefined') {
    inputNode.focus()
    let range = inputNode.createTextRange()
    range.collapse(false)
    range.select()
  }
}
