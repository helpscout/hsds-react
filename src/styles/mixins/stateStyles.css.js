import { STATES } from '../configs/constants'
import { getColor } from '../utilities/color'
import forEach from '../utilities/forEach'

/**
 * Generates the color CSS property for various states.
 *
 * @returns The compiled CSS styles.
 */
export const makeStateColorStyles = (prop: string = 'color'): string => {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      color: ${getColor('state', state, prop)};
    }
  `
  )
}
