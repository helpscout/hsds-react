/* istanbul ignore file */
// Excluding most of the branches in these functions from test coverage.
// Reason is because interactions are difficult to mock or are not supported
// by JSDOM.

/**
 * Copies the selected content to user's clipboard.
 */
export const copyToClipboard = () => {
  if (document && document.execCommand) {
    document.execCommand('copy')
  }
}

/**
 * Selects text content within an HTMLElement
 *
 * @param   { HTMLElement } element The targeted HTMLElement
 * @returns { string } The selected text
 */
export const selectText = element => {
  let selectedText

  if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    const isReadOnly = element.hasAttribute('readonly')

    if (!isReadOnly) {
      element.setAttribute('readonly', '')
    }

    element.select()
    element.setSelectionRange(0, element.value.length)

    if (!isReadOnly) {
      element.removeAttribute('readonly')
    }

    selectedText = element.value
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus()
    }

    const selection = window.getSelection()
    const range = document.createRange()

    range.selectNodeContents(element)

    selection.removeAllRanges()

    selection.addRange(range)

    selectedText = selection.toString()
  }

  return selectedText || ''
}
