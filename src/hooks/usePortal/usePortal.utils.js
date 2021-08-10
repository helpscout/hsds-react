/**
 * Creates DOM element to be used as React root.
 * @param {String} selector A valid selector for the target container, e.g '#modal' or '.spotlight'
 * @returns {HTMLElement}
 */
export function createRootElement(selector) {
  const rootContainer = document.createElement('div')

  if (selector.includes('.')) {
    rootContainer.classList.add(selector.replace('.', ''))
  } else {
    rootContainer.setAttribute('id', selector.replace('#', ''))
  }

  return rootContainer
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
export function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  )
}
