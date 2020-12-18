/* istanbul ignore file */
// These are just exported strings
import { getColor } from '../../styles/utilities/color'

const common = `
  background-color: #fff;
  transition: all 0.16s;
  will-change: box-shadow;
`
export const d100 = `
  ${common}
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`
export const d200 = `
  ${common}
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`
export const d200Effect = `
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`

export const d300 = `
  ${common}
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04),
                  0 2px 8px rgba(0, 0, 0, 0.04),
                  0 5px 8px rgba(99, 116, 134, 0.03);
`
export const d300Effect = `
  box-shadow: 0 0 0 1px ${getColor('grey.500')},
                  0 2px 8px rgba(0, 0, 0, 0.04),
                  0 5px 8px rgba(99, 116, 134, 0.03);
`
export const d400 = `
  ${common}
  box-shadow: 0 0 0 1px rgba(197, 206, 214, 0.7),
                  0 1px 0 0 ${getColor('ash.700')},
                  0 1px 3px rgba(0, 0, 0, 0.1);
`
export const d400Effect = `
  box-shadow: 0 0 0 1px rgba(197, 206, 214, 0.7),
                  0 1px 0 0 ${getColor('ash.700')},
                  0 4px 20px rgba(0, 0, 0, 0.1);
`
export const d500 = `
  ${common}
  box-shadow: inset 0 0 0 1px ${getColor('grey.600')},
                            0 1px 7px rgba(0, 0, 0, 0.08);
`
export const d500Effect = `
  box-shadow: inset 0 0 0 1px ${getColor('grey.700')},
                        0 30px 60px rgba(0, 0, 0, 0.15);
`
export const d600 = `
  ${common}
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
                  0 4px 6px rgba(0, 0, 0, 0.15);
`
export const d600Effect = `
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
                  0 4px 6px rgba(0, 0, 0, 0.15);
`
export const d700 = `
  ${common}
  box-shadow: 0 2px 3px rgba(64, 82, 97, 0.2),
                  0 10px 40px rgba(64, 82, 97, 0.3);
`

export default {
  d100,
  d200,
  d200Effect,
  d300,
  d300Effect,
  d400,
  d400Effect,
  d500,
  d500Effect,
  d600,
  d700,
}
