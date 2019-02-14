import baseStyles from '../../../styles/resets/baseStyles.css.js'
import linkStyles from '../../../styles/mixins/linkStyles.css.js'
import { makeStateColorStyles } from '../../../styles/mixins/stateStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import { TEXT_SHADES } from '../../../styles/configs/constants'

export const VAR_NAMESPACE_SIZE = 'BlueConfigTextFontSize'
export const TEXT_SIZES = [10, 11, 12, 13, 14, 15, 16, 20, 48]
export const TEXT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const css: string = `
  ${baseStyles}
  line-height: 1.5;

  &.is-disableSelect {
    user-select: none;
  }

  ${makeShadeStyles()}
  ${makeSizeStyles()}
  ${makeStateColorStyles()}
  ${makeWeightStyles()}

  &.is-truncate {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.is-wordWrap {
    word-break: break-word;
  }

  &.is-no-wrap {
    white-space: nowrap;
  }

  &.is-lineHeightInherit {
    line-height: inherit;
  }

  &.is-lineHeightReset {
    line-height: 1;
  }

  &.is-all-caps {
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  &.is-block {
    display: block;
  }

  &.is-center {
    text-align: center;
  }

  &.is-linkStyle {
    ${linkStyles()}
  }

  &.is-noUnderline {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  &.is-plainLink {
    color: ${getColor('link.base')};
  }

  &.is-samp {
    font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
    font-family: var(--BlueConfigGlobalFontFamilyMono);
  }
`

function makeShadeStyles(): string {
  return forEach(
    TEXT_SHADES,
    shade => `
    &.is-${shade} {
      color: ${getColor('text', shade)};
    }
  `
  )
}

function makeSizeStyles(): string {
  return forEach(
    TEXT_SIZES,
    size => `
    &.is-${size} {
      ${variableFontSize({
        varName: VAR_NAMESPACE_SIZE,
        fontSize: size,
      })}
    }
  `
  )
}

export function makeWeightStyles(): string {
  return forEach(
    TEXT_WEIGHTS,
    weight => `
    &.is-${weight} {
      font-weight: ${weight};
    }
    `
  )
}

export default css
