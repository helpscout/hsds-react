/* istanbul ignore next */
// Can't write tests for this in JSDOM.
// Can't create fixture for JSDOM's built-in Navigator instance.
export const isBrowser = (browser) => {
  /* istanbul ignore next */
  if (!navigator) return false
  return (navigator.userAgent.toLowerCase().indexOf(browser) > -1)
}

export const isEdge = /* istanbul ignore next */ () => isBrowser('edge')
export const isChrome = /* istanbul ignore next */ () => isBrowser('chrome')
export const isFirefox = /* istanbul ignore next */ () => isBrowser('firefox')
export const isSafari = /* istanbul ignore next */ () => isBrowser('safari')
