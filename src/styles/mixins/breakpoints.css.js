// @flow
import { isFunction, isString, isNumber } from '../../utilities/is'

const breakpoints = {
  xs: 0,
  sm: '544px',
  md: '768px',
  lg: '992px',
}

type BreakpointValue = number | 'xs' | 'sm' | 'md' | 'lg'

type BreakpointStyles = () => string

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

  const compiledStyles = isFunction(styles) ? styles() : styles

  return `@media (min-width: ${minWidth}) {
    ${
      // $FlowFixMe
      compiledStyles
    }
  }`
}
