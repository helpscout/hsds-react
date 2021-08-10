import { useEffect, useState } from 'react'
import { getClosestFocusableParent } from '../utilities/focus'

export default function useAnimatedRender(show, overlayRef, contentRef) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show])

  function onAnimationEnd(e) {
    if (e.target === overlayRef.current) {
      if (!show) {
        setRender(false)

        if (overlayRef.current) {
          const focusableParent = getClosestFocusableParent(overlayRef.current)
          focusableParent.focus()
        }
      } else {
        contentRef.current && contentRef.current.focus()
      }
    }
  }

  return [shouldRender, onAnimationEnd]
}

export const overlayDefaultAnimation = `
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
