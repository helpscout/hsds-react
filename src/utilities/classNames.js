export const classNames = (...classes) => {
  return classes
    .filter(name => name && typeof name !== 'boolean')
    .join(' ')
}

export const variantClassNames = (className, variant = '') => {
  if (typeof className !== 'string' || !className.length) return ''
  if (variant && typeof variant !== 'string') return className

  return variant
    .trim()
    .split(/[ ,]+/)
    .map(o => `${className}-${o}`)
    .join(' ')
}

export default classNames
