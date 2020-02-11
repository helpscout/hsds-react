/* istanbul ignore file */

/**
 * Higher order functional wrapper for the other log methods
 *
 * @param function  $fn         Console.log method
 * @param string    $message    Message to log
 *
 * @returns function
 */
const logWrapper = fn => message => {
  if (process.env.NODE_ENV !== 'test') {
    return fn(message)
  }
}

export const log = message => {
  return logWrapper(console.log)(`Blue: ${message}`)
}

export const warn = message => {
  return logWrapper(console.warn)(`Blue: ${message}`)
}

export const error = message => {
  return logWrapper(console.error)(`Blue: ${message}`)
}

export const Exception = (methodName, message) => {
  if (typeof methodName !== 'string' || typeof message !== 'string') {
    warn('helix: Exception(): Arguments need to be strings.')
  }

  
  
  this.message = `Blue: ${methodName}(): ${message}`
}
