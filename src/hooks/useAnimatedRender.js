import { useEffect, useState } from 'react'
import { getClosestFocusableParent } from '../utilities/focus'

/**
 *
 * @param {boolean} show Whether the target component should be shown or not
 * @param {HTMLElement} nodeToAnimate The Node to animate out
 * @param {HTMLElement} nodeToFocus If provided, the node to focus
 *
 * @returns {Array} whether to render and onAnimationEnd callback
 */
export default function useAnimatedRender(show, nodeToAnimate, nodeToFocus) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show])

  function onAnimationEnd(e) {
    if (e.target === nodeToAnimate) {
      if (!show) {
        setRender(false)

        if (nodeToAnimate) {
          const focusableParent = getClosestFocusableParent(nodeToAnimate)
          focusableParent.focus()
        }
      } else {
        nodeToFocus && nodeToFocus.focus()
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
