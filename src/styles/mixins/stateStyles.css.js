import { STATES } from '../configs/constants'
import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'

/**
 * Generates the color CSS property for various states.
 *
 * @returns The compiled CSS styles.
 */
export const makeStateColorStyles = (prop = 'color') => {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      color: ${getColor('state', state, prop)};
    }
  `
  )
}
