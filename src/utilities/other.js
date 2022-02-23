export function noop() {}

export const isNodeEnv = () => {
  const process = window.process
  return !!(
    typeof process !== 'undefined' &&
    typeof process.title === 'string' &&
    process.title.toLowerCase().indexOf('node') >= 0
  )
}
