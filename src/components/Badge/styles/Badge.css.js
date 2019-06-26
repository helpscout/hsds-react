import { STATUSES } from '../../../styles/configs/constants'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'

const css = `
  ${baseStyles}
  ${variableFontSize({ fontSize: 12 })}
  background-color: ${getColor('charcoal.200')};
  border-radius: 9999px;
  box-sizing: border-box;
  color: white;
  display: inline-block;
  font-weight: 500;
  min-width: 18px;
  line-height: 1;
  padding: 3px 8px;
  text-align: center;

  ${makeStatusStyles()}

  &.is-sm {
    ${variableFontSize({ fontSize: 11 })}
    padding: 2px 8px;
  }

  &.is-count {
    font-weight: 400;
    min-width: 20px;
    padding: 4px;
  }

  &.is-square {
    border-radius: 3px;
    color: ${getColor('grey.800')};
    font-weight: 400;
    padding: 4px 3px;
    font-size: 11px;
    line-height: 10px;
    background-color: ${getColor('grey.300')};
    box-shadow: 0 0 0 1px ${getColor('grey.500')} inset;
  }

  &.is-white {
    background-color: white;
    box-shadow: 0 0 0 1px ${getColor('border.ui')} inset;
    color: ${getColor('charcoal.200')};
  }

  &.is-display-block {
    display: block;
  }
  &.is-display-inlineBlock {
    display: inline-block;
  }
`

function makeStatusStyles() {
  return forEach(
    STATUSES,
    status => `
    &.is-${status} {
      background-color: ${getColor('state', status, 'borderColor')};
    }
  `
  )
}

export default css
