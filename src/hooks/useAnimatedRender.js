import { useEffect, useState } from 'react'
import { getClosestFocusableParent } from '../utilities/focus'

/**
 *
 * @param {boolean} show Whether the target component should be shown or not
 * @param {Object} toAnimateRef The ref to the node to animate out
 * @param {Object} toFocusRef If provided, the ref to the node to focus
 *
 * @returns {Array} whether to render and onAnimationEnd callback
 */
export default function useAnimatedRender(show, toAnimateRef, toFocusRef) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show])

  function onAnimationEnd(e) {
    if (e.target === toAnimateRef.current) {
      if (!show) {
        setRender(false)

        const focusableParent = getClosestFocusableParent(toAnimateRef.current)
        focusableParent.focus()
      } else {
        toFocusRef.current && toFocusRef.current.focus()
      }
    }
  }

  return [shouldRender, onAnimationEnd]
}

export const defaultAnimation = `
animation: fadeOut 0.3s;

&.element-in {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`
