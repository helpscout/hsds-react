export const COMPONENT_KEY = {
  Page: 'Page',
  Actions: 'PageActions',
  Card: 'PageCard',
  Content: 'PageContent',
  Header: 'PageHeader',
  Heading: 'PageHeading',
  Section: 'PageSection',
}

export function isIntersectionObserverSupported() {
  /* istanbul ignore next */
  if (typeof window === 'object' && 'IntersectionObserver' in window) {
    return true
  }
  /* istanbul ignore next */
  return false
}
