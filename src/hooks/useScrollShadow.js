// very difficult to test with JSDom, some basic interaction is tested in ScrollableContainer
/* istanbul ignore file */
import { useEffect } from 'react'
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

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (scrollableRef.current != null) {
        const topElement = topRef && topRef.current
        const bottomElement = bottomRef && bottomRef.current
        const { isBottomScrolled, isTopScrolled } = handleShadows(
          scrollableRef.current
        )

        setShadows(topElement, isTopScrolled, { initialShadow, scrolledShadow })
        setShadows(bottomElement, isBottomScrolled, {
          initialShadow,
          scrolledShadow,
        })
      }
    }, drawInitialShadowsDelay)

    return () => {
      clearTimeout(timeoutID)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawInitialShadowsDelay, initialShadow, scrolledShadow])

  const handleOnScroll = throttle(() => {
    const { isTopScrolled, isBottomScrolled } = handleShadows(
      scrollableRef.current
    )
    const topElement = topRef && topRef.current
    const bottomElement = bottomRef && bottomRef.current

    setShadows(topElement, isTopScrolled, {
      initialShadow,
      scrolledShadow,
    })
    setShadows(bottomElement, isBottomScrolled, {
      initialShadow,
      scrolledShadow,
    })
  }, 100)

  return [handleOnScroll]
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

function handleShadows(scrollable) {
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
