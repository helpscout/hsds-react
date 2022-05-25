import styled from 'styled-components'

import { generateLinkStyles } from '@hsds/utils-mixins'
import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'
import { variableFontSize, BASE_FONT_SIZE } from '@hsds/utils-fonts'
import { makeWeightStyles } from '../Text/Text.css'

export const VAR_NAMESPACE_SIZE = 'HSDSGlobalHeadingFontSize'
export const SHADES = {
  light: getColor('charcoal.200'),
}
export const HEADING_SIZES = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: BASE_FONT_SIZE,
  big: 20,
  md: 18,
  small: 11,
}

export const HeadingUI = styled.div`
  color: ${getColor('charcoal.600')};
  display: block;
  font-size: ${HEADING_SIZES.h1}px;
  font-weight: 500;
  line-height: 1.2;

  ${makeSizeStyles()}
  ${makeShadeStyles()}

  &.is-big {
    font-weight: 600;
  }

  &.is-small {
    color: ${getColor('charcoal.500')};
    letter-spacing: 0.5px;
    text-transform: uppercase;

    ${makeShadeStyles()}
  }

  &.is-disableSelect {
    user-select: none;
  }

  &.is-center {
    text-align: center;
  }

  &.is-linkStyle {
    ${generateLinkStyles()}
  }

  &.is-truncate {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.is-lineHeightInherit {
    line-height: inherit;
  }

  &.is-lineHeightReset {
    line-height: 1;
  }

  &.is-wordWrap {
    word-break: break-word;
  }

  &.is-noWrap {
    white-space: nowrap;
  }

  ${makeWeightStyles()}
`

function makeShadeStyles() {
  const shades = Object.keys(SHADES)

  return forEach(
    shades,
    shade => `
    &.is-${shade} {
      color: ${SHADES[shade]};
    }
  `
  )
}

function makeSizeStyles() {
  const sizes = Object.keys(HEADING_SIZES)

  return forEach(
    sizes,
    size => `
    &.is-${size} {
      ${variableFontSize({
        varName: VAR_NAMESPACE_SIZE,
        fontSize: HEADING_SIZES[size],
      })}
      line-height: 1.2;
    }
  `
  )
}
