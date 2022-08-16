import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  CONTENT_CLASS_NAME,
  HIDE_CONTENT_ANIMATION_NAME,
  POWERED_BY_HEIGHT,
} from './MessageCard.NPS.styles'

export function useContentTransitions(cardRef, withContentAnimations) {
  const [state, setState] = useState('initial')
  const [currentHeight, setCurrentHeight] = useState(undefined)
  const [isTransitioning, setIsTransitioning] = useState(undefined)
  const isMounted = useRef(true)

  const onTransitionEnd = useCallback(
    e => {
      // after height transition ended, disable transitioning state
      if (e.target === cardRef.current && e.propertyName === 'height') {
        // needs to be called in a timeout because of scrollbar appearing too early for a moment, due to multiple animations on different elements
        setTimeout(() => isMounted.current && setIsTransitioning(false), 300)
      }
    },
    [cardRef.current]
  )

  const onAnimationEnd = useCallback(e => {
    // When hiding content animation has finished, set confirmed state and proper height
    if (e.animationName === HIDE_CONTENT_ANIMATION_NAME) {
      // height has to be a fixed value, because it's too early to get it automatically (we want to shrink Message before showing new content)
      const contentHeight = 84
      withContentAnimations &&
        setCurrentHeight(POWERED_BY_HEIGHT + contentHeight)
      setIsTransitioning(true)
      setState('confirmed')
    }
  }, [])

  const onAnimationStart = useCallback(e => {
    if (e.animationName === HIDE_CONTENT_ANIMATION_NAME) {
      setIsTransitioning(true)
    }
  }, [])

  const setNewHeightBasedOnContent = useCallback(() => {
    const element = cardRef.current
    const hiddenElementHeight = 18
    const offsetCompensation = POWERED_BY_HEIGHT + hiddenElementHeight
    if (withContentAnimations) {
      const newHeight =
        element.querySelector(`.${CONTENT_CLASS_NAME}`).scrollHeight +
        offsetCompensation

      setCurrentHeight(prev => {
        if (prev && prev !== newHeight) {
          return newHeight
        }
      })
    }
  }, [cardRef.current])

  const resizeContent = useCallback(() => {
    setNewHeightBasedOnContent()
  }, [setNewHeightBasedOnContent])

  // Setup transition/animation listeners
  useEffect(() => {
    if (!cardRef.current) {
      return
    }

    const element = cardRef.current
    const content = element.querySelector(`.${CONTENT_CLASS_NAME}`)
    element.addEventListener('transitionend', onTransitionEnd)
    content.addEventListener('animationstart', onAnimationStart)
    content.addEventListener('animationend', onAnimationEnd)
    window.addEventListener('resize', resizeContent)

    return () => {
      element.removeEventListener('transitionend', onTransitionEnd)
      content.removeEventListener('animationstart', onAnimationStart)
      content.removeEventListener('animationend', onAnimationEnd)
      window.removeEventListener('resize', resizeContent)
      isMounted.current = false
    }
  }, [cardRef.current])

  // Set initial height
  useLayoutEffect(() => {
    if (cardRef.current && withContentAnimations) {
      setCurrentHeight(cardRef.current.getBoundingClientRect().height)
    }
  }, [cardRef.current])

  // set height of card after selecting option
  useLayoutEffect(() => {
    if (state === 'selected' && withContentAnimations) {
      setIsTransitioning(true)
      setNewHeightBasedOnContent()
    }
  }, [state])

  // compensate to set correct height of element if user prefers reduced motion (no animations)
  useLayoutEffect(() => {
    const element = cardRef.current
    const mediaQuery = window.matchMedia(`(prefers-reduced-motion: reduce)`)
    const hasDifferentHeight =
      currentHeight && element.scrollHeight !== currentHeight
    if (state === 'selected' && hasDifferentHeight && mediaQuery.matches) {
      setCurrentHeight(element.scrollHeight)
    }
  }, [currentHeight])

  return { state, setState, currentHeight, isTransitioning }
}
