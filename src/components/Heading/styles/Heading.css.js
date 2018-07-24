// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import linkStyles from '../../../styles/mixins/linkStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import { BASE_FONT_SIZE } from '../../Text/styles/Text.css.js'

export const VAR_NAMESPACE_SIZE = 'BlueConfigHeadingFontSize'
export const SHADES = {
  light: getColor('charcoal', 200),
}
export const HEADING_SIZES = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: BASE_FONT_SIZE,
  h6: 13,
  big: 20,
  small: 11,
}

const css = `
  ${baseStyles}
  color: ${getColor('charcoal', 600)};
  display: block;
  font-size: ${HEADING_SIZES.h1}px;
  font-weight: 500;
  line-height: 1.2;

  ${makeShadeStyles()}
  ${makeSizeStyles()}

  &.is-big {
    font-weight: 600;
  }

  &.is-small {
    color: ${getColor('charcoal', 500)};
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  &.is-disableSelect {
    user-select: none;
  }

  &.is-center {
    text-align: center;
  }

  &.is-linkStyle {
    ${linkStyles()}
  }

  &.is-line-height-reset {
    line-height: 1;
  }
`

function makeShadeStyles(): string {
  const shades = Object.keys(SHADES)
  return shades
    .map(
      shade => `
    &.is-${shade} {
      color: ${SHADES[shade]};
    }
  `
    )
    .join('')
}

function makeSizeStyles(): string {
  const sizes = Object.keys(HEADING_SIZES)
  return sizes
    .map(
      size => `
    &.is-${size} {
      ${variableFontSize({
        varName: VAR_NAMESPACE_SIZE,
        baseFontSize: BASE_FONT_SIZE,
        fontSize: HEADING_SIZES[size],
      })}
      line-height: 1.2;
    }
  `
    )
    .join('')
}

export default css
