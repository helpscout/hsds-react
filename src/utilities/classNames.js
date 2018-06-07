// @flow

/**
 * Tiny implementation of the classnames library.
 *
 * @param   {any} classes
 * @returns {string}
 */
export const classNames = (...classes: any): string => {
  return classes.filter(name => name && typeof name !== 'boolean').join(' ')
}

/**
 * Generate className variations.
 *
 * @param   {string} className
 * @param   {string} variation
 * @returns {string}
 */
export const variantClassNames = (
  className: string,
  variant: string = ''
): string => {
  if (typeof className !== 'string' || !className.length) return ''
  if (variant && typeof variant !== 'string') return className

  return variant
    .trim()
    .split(/[ ,]+/)
    .map(o => `${className}-${o}`)
    .join(' ')
}

export default classNames
