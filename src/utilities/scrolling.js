// @flow
import { isFirefox } from './browser'
import { isMouseWheelYEvent } from './events'

type ScrollEvent = SyntheticWheelEvent<HTMLDivElement> | WheelEvent

export const remapScrollingPlane = (event: ScrollEvent) => {
  // Scrolling behaviour is strange in Firefox…
  // We'll let Firefox natively handle things.
  /* istanbul ignore next */
  // Can't write tests for this in JSDOM.
  // Can't create fixture for JSDOM's built-in Navigator instance.
  if (isFirefox()) return

  const node = event.currentTarget

  // Don't customize native shift + scroll interactions
  // $FlowFixMe
  if (event.target.shiftKey) return
  if (!node) return
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    return
  }

  if (isMouseWheelYEvent(event)) {
    // $FlowFixMe
    node.scrollLeft += event.deltaY
  }

  // Scroll-locking
  event.preventDefault()
}
