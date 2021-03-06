import styled from 'styled-components'

import linkStyles from '../../styles/mixins/linkStyles.css'
import { makeStateColorStyles } from '../../styles/mixins/stateStyles.css'
import { getColor } from '../../styles/utilities/color'
import forEach from '../../styles/utilities/forEach'
import variableFontSize from '../../styles/utilities/variableFontSize'
import { TEXT_SHADES } from '../../styles/configs/constants'

export const VAR_NAMESPACE_SIZE = 'HSDSGlobalTextFontSize'
export const TEXT_SIZES = [10, 11, 12, 13, 14, 15, 16, 20, 48]
export const TEXT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export const TextUI = styled.span`
  
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
    font-family: var(--HSDSGlobalFontFamilyMono);
  }
`

function makeShadeStyles() {
  return forEach(
    TEXT_SHADES,
    shade => `
    &.is-shade-${shade} {
      color: ${getColor('text', shade)};
    }
  `
  )
}

function makeSizeStyles() {
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

export function makeWeightStyles() {
  return forEach(
    TEXT_WEIGHTS,
    weight => `
    &.is-${weight} {
      font-weight: ${weight};
    }
    `
  )
}
