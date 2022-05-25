import { getColor } from '@hsds/utils-color'
import { rgba } from '@hsds/utils-color'

export const makeShadows = (...args) => args.join(',')

export const shadows = {
  '100': makeShadows(`0 1px 7px ${rgba('#000000', 0.08)}`),

  '150': makeShadows(
    `0 0 0 1px ${rgba('#000000', 0.04)}`,
    `0 2px 8px ${rgba('#000000', 0.04)}`,
    `0 5px 8px ${rgba(getColor('grey.300'), 0.04)}`
  ),

  '200': makeShadows(`0 3px 6px ${rgba(getColor('grey.600'), 0.5)}`),

  '250': makeShadows(`0 4px 7px ${rgba('#000000', 0.1)}`),

  '300': makeShadows(`0 4px 6px ${rgba(getColor('charcoal.200'), 0.5)}`),

  '400': makeShadows(`0 3px 8px ${rgba('#000000', 0.2)}`),

  '800': makeShadows(
    `0 0 0 1px ${rgba('#000000', 0.05)}`,
    `0 5px 30px ${rgba('#000000', 0.15)}`,
    `0 3px 3px ${rgba('#000000', 0.05)}`
  ),

  '900': makeShadows(
    `0 2px 3px ${rgba(getColor('charcoal.500'), 0.2)}`,
    `0 10px 40px ${rgba(getColor('charcoal.500'), 0.3)}`
  ),
}

export default shadows
