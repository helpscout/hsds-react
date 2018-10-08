type Browser = string

/* istanbul ignore next */
// Can't write tests for this in JSDOM.
// Can't create fixture for JSDOM's built-in Navigator instance.
export const isBrowser = (browser: Browser) => {
  if (!navigator) return false
  return navigator.userAgent.toLowerCase().indexOf(browser) > -1
}

export const isEdge = (): boolean => isBrowser('edge')
export const isChrome = (): boolean => isBrowser('chrome')
export const isFirefox = (): boolean => isBrowser('firefox')
export const isSafari = (): boolean => isBrowser('safari')
