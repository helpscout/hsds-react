export function isIntersectionObserverSupported() {
  if (typeof window === 'object' && 'IntersectionObserver' in window) {
    return true
  }

  return false
}
