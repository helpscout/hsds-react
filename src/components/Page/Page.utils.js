export function isIntersectionObserverSupported() {
  /* istanbul ignore next */
  if (typeof window === 'object' && 'IntersectionObserver' in window) {
    return true
  }
  /* istanbul ignore next */
  return false
}
