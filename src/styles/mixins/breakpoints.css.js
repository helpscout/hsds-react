import isFunction from 'lodash.isfunction'
import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'

export const breakpoints = {
  xs: 0,
  sm: '544px',
  md: '768px',
  lg: '992px',
}

// type BreakpointValue = number | 'xs' | 'sm' | 'md' | 'lg'

// type BreakpointStyles = string | (() => string)

/**
 * Generates a mobile-first @media query CSS rule.
 *
 * @param   {number|string} value Min-width value.
 * @param   {Function|string} styles The styles to render.
 * @returns {string} The compiled @media query rule.
 */
export function breakpoint(value = 'md', styles) {
  if (!isString(value) && !isNumber(value)) return ''

  const minWidth = breakpoints.hasOwnProperty(value)
    ? breakpoints[value]
    : isNumber(value)
    ? `${value}px`
    : value

  const compiledStyles = isFunction(styles) ? styles() : styles

  return `@media (min-width: ${minWidth}) {
    ${compiledStyles}
  }`
}

export function breakpointAll(content) {
  return `
    ${content}

    @media (min-width: ${breakpoints.sm}) {
      ${content}
    }
    @media (min-width: ${breakpoints.md}) {
      ${content}
    }
    @media (min-width: ${breakpoints.lg}) {
      ${content}
    }
  `
}
