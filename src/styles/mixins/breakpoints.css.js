// @flow
import { isFunction, isString, isNumber } from '../../utilities/is'

export const breakpoints = {
  xs: 0,
  sm: '544px',
  md: '768px',
  lg: '992px',
}

type BreakpointValue = number | 'xs' | 'sm' | 'md' | 'lg'

type BreakpointStyles = string | (() => string)

/**
 * Generates a mobile-first @media query CSS rule.
 *
 * @param   {number|string} value Min-width value.
 * @param   {Function|string} styles The styles to render.
 * @returns {string} The compiled @media query rule.
 */
export function breakpoint(
  value: BreakpointValue = 'md',
  styles: BreakpointStyles
): string {
  if (!isString(value) && !isNumber(value)) return ''

  const minWidth = breakpoints.hasOwnProperty(value)
    ? breakpoints[value]
    : isNumber(value)
      ? `${value}px`
      : value

  // $FlowFixMe
  const compiledStyles = isFunction(styles) ? styles() : styles

  return `@media (min-width: ${minWidth}) {
    ${
      // $FlowFixMe
      compiledStyles
    }
  }`
}

export function breakpointAll(content: string): string {
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
