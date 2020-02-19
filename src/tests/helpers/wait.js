/* istanbul ignore file */
export const wait = (time = 0) => {
  return new Promise((resolve, reject) => {
    let waitTime = setTimeout(() => {
      clearTimeout(waitTime)
      resolve()
    }, time)
  })
}

export const waitForSelectors = selectors => {
  return new Promise((resolve, reject) => {
    const timeout = 8
    const maxAttempts = 250
    const attemptToFindNodes = (attemptCount = 0) => {
      if (attemptCount >= maxAttempts) {
        return reject(
          new Error('waitForSelectors: Could not find selectors in time.')
        )
      }
      const nodeList = document.querySelectorAll(selectors)
      if (nodeList.length) {
        return resolve(nodeList)
      }
      setTimeout(() => {
        attemptToFindNodes(attemptCount + 1)
      }, timeout)
    }

    return attemptToFindNodes()
  })
}

export default wait
