/**
 * Get the total number of lines (rows) of a textarea
 *
 * @param   {HTMLElement} textarea
 * @returns {number}
 */
export const getTextAreaLineTotal = textarea => {
  if (!textarea) return 0
  return textarea.value.split(/\r*\n/).length
}

/**
 * Get the current line (row) of the textarea based on cursor position.
 *
 * @param   {HTMLElement} textarea
 * @returns {number}
 */
export const getTextAreaLineCurrent = textarea => {
  if (!textarea) return 0
  return textarea.value.substr(0, textarea.selectionStart).split('\n').length
}
