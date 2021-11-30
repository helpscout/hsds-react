// very difficult to test with JSDom, some basic interaction is tested in ScrollableContainer
/* istanbul ignore file */
import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const BOX_SHADOW_INITIAL = '0 0 0 1px rgba(0, 0, 0, 0.1)'
const BOX_SHADOW_SCROLLED =
  '0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 5px rgba(0, 0, 0, 0.05)'

export default function useScrollShadow({
  bottomRef,
  drawInitialShadowsDelay = 0,
  scrollableRef,
  shadows = {},
  topRef,
}) {
  const initialShadow = shadows.initial || BOX_SHADOW_INITIAL
  const scrolledShadow = shadows.scrolled || BOX_SHADOW_SCROLLED
  const [isTopScrolled, setIsTopScrolled] = useState(null)
  const [isBottomScrolled, setIsBottomScrolled] = useState(null)

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      const scrollableElement = getElement(scrollableRef)

      if (scrollableElement) {
        const topElement = getElement(topRef)
        const bottomElement = getElement(bottomRef)
        const { isBottomScrolled, isTopScrolled } = getScrollableSectionsState(
          scrollableElement
        )
        setShadows(topElement, isTopScrolled, { initialShadow, scrolledShadow })
        setShadows(bottomElement, isBottomScrolled, {
          initialShadow,
          scrolledShadow,
        })
        setIsTopScrolled(isTopScrolled)
        setIsBottomScrolled(isBottomScrolled)
      }
    }, drawInitialShadowsDelay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [
    drawInitialShadowsDelay,
    initialShadow,
    scrolledShadow,
    topRef,
    bottomRef,
    scrollableRef,
  ])

  const handleOnScroll = throttle(() => {
    const scrollableElement = getElement(scrollableRef)
    const { isTopScrolled, isBottomScrolled } = getScrollableSectionsState(
      scrollableElement
    )
    const topElement = getElement(topRef)
    const bottomElement = getElement(bottomRef)

    setShadows(topElement, isTopScrolled, {
      initialShadow,
      scrolledShadow,
    })
    setShadows(bottomElement, isBottomScrolled, {
      initialShadow,
      scrolledShadow,
    })
    setIsTopScrolled(isTopScrolled)
    setIsBottomScrolled(isBottomScrolled)
  }, 100)

  return [handleOnScroll, isTopScrolled, isBottomScrolled]
}

function getElement(someRef) {
  if (someRef instanceof HTMLElement) return someRef
  return someRef && someRef.current
}

function setShadows(element, isScrolled, { initialShadow, scrolledShadow }) {
  if (element) {
    element.style.boxShadow = 'var(--scroll-shadow)'

    if (isScrolled) {
      element.style.setProperty('--scroll-shadow', scrolledShadow)
    } else {
      element.style.setProperty('--scroll-shadow', initialShadow)
    }
  }
}

export function getScrollableSectionsState(scrollable) {
  if (!scrollable) {
    return {
      isTopScrolled: false,
      isBottomScrolled: false,
    }
  }

  const style = window.getComputedStyle(scrollable)
  const paddingTop = Number.parseInt(style.paddingTop, 10)
  const paddingBottom = Number.parseInt(style.paddingBottom, 10)
  const scrollableScrollHeight = scrollable.scrollHeight
  const scrollableHeight = scrollable.offsetHeight
  const scrollablePaddingTop = paddingTop > 0 ? paddingTop - paddingTop / 2 : 0
  const scrollablePaddingBottom =
    paddingBottom > 0 ? paddingBottom + paddingBottom / 2 : 0

  return {
    isTopScrolled: scrollable.scrollTop - scrollablePaddingTop > 0,
    isBottomScrolled:
      scrollable.scrollTop + scrollableHeight + scrollablePaddingBottom <
      scrollableScrollHeight,
  }
}
