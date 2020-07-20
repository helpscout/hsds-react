/* istanbul ignore file */
// Can't write tests for this in JSDOM.
// Can't create fixture for JSDOM's built-in Navigator instance.
export const isBrowser = browser => {
  if (!navigator) return false
  return navigator.userAgent.toLowerCase().indexOf(browser) > -1
}

export const isEdge = () => isBrowser('edge')
export const isChrome = () => isBrowser('chrome')
export const isFirefox = () => isBrowser('firefox')
export const isSafari = () => isBrowser('safari') && !isBrowser('chrome')
