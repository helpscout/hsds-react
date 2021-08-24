/* istanbul ignore file */
import { useContext, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GlobalContext } from '../../components/HSDS/Provider'
import { createRootElement, addRootElement } from './usePortal.utils'

/**
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @param {String} selector A valid selector for the target container, e.g '#modal' or '.spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
function usePortal(selector) {
  const rootElemRef = useRef(null)
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const scope = getCurrentScope ? getCurrentScope() : null

  useEffect(
    function setupElement() {
      let parentElem

      if (!selector) {
        parentElem = document.body
        parentElem.classList.add(scope)
      } else {
        // Look for existing target dom element to append to
        const existingParent = document.querySelector(selector)

        // Parent is either a new root or the existing dom element
        parentElem = existingParent || createRootElement(selector)

        if (scope && parentElem.closest(`.${scope}`) == null) {
          parentElem.classList.add(scope)
        }

        // If there is no existing DOM element, add a new one.
        if (!existingParent) {
          addRootElement(parentElem)
        }
      }

      // Add the detached element to the parent
      parentElem.appendChild(rootElemRef.current)

      return function removeElement() {
        rootElemRef.current.remove()
        if (!parentElem.childElementCount) {
          parentElem.remove()
        }
      }
    },
    [selector, scope]
  )

  /**
   * It's important we evaluate this lazily:
   * - We import { createPortal } from 'react-dom'
need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  return getRootElem()
}

export default usePortal

/** A convenience <Portal> component */
export const Portal = ({ selector, children }) => {
  const target = usePortal(selector)

  return createPortal(children, target)
}
