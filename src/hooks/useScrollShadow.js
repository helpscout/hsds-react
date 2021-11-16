// very difficult to test with JSDom, some basic interaction is tested in ScrollableContainer
/* istanbul ignore file */
import { useEffect } from 'react'
import throttle from 'lodash.throttle'

const BOX_SHADOW_INITIAL = '0 0 0 1px rgba(0, 0, 0, 0.1)'
const BOX_SHADOW_SCROLLED =
  '0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 5px rgba(0, 0, 0, 0.05)'

export default function useScrollShadow({
  bottomRef,
  scrollableRef,
  topRef,
  shadows = {},
}) {
  const initialShadow = shadows.initial || BOX_SHADOW_INITIAL
  const scrolledShadow = shadows.scrolled || BOX_SHADOW_SCROLLED

  useEffect(() => {
    setTimeout(() => {
      if (scrollableRef && scrollableRef.current != null) {
        const topElement = topRef && topRef.current
        const bottomElement = bottomRef && bottomRef.current

        if (topElement) {
          topElement.style.boxShadow = 'var(--scroll-shadow)'
        }

        if (bottomElement) {
          bottomElement.style.boxShadow = 'var(--scroll-shadow)'
        }

        const { isBottomScrolled } = handleShadows(scrollableRef)

        if (isBottomScrolled) {
          bottomElement.style.setProperty('--scroll-shadow', scrolledShadow)
        }
      }
    }, 100)
  }, [scrollableRef, bottomRef, topRef, scrolledShadow])

  const handleOnScroll = throttle(e => {
    const { isTopScrolled, isBottomScrolled } = handleShadows(scrollableRef)
    const topElement = topRef && topRef.current
    const bottomElement = bottomRef && bottomRef.current

    if (topElement) {
      if (isTopScrolled) {
        topElement.style.setProperty('--scroll-shadow', scrolledShadow)
      } else {
        topElement.style.setProperty('--scroll-shadow', initialShadow)
      }
    }

    if (bottomElement) {
      if (isBottomScrolled) {
        bottomElement.style.setProperty('--scroll-shadow', scrolledShadow)
      } else {
        bottomElement.style.setProperty('--scroll-shadow', initialShadow)
      }
    }
  }, 100)

  return [handleOnScroll]
}

function handleShadows(scrollableRef) {
  if (!scrollableRef || !scrollableRef.current) {
    return {
      isTopScrolled: false,
      isBottomScrolled: false,
    }
  }

  const scrollable = scrollableRef.current
  const style = window.getComputedStyle(scrollable)
  const paddingTop = Number.parseInt(style.paddingTop.replace('px', ''), 10)
  const paddingBottom = Number.parseInt(
    style.paddingBottom.replace('px', ''),
    10
  )
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
