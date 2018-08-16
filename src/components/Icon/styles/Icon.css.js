// @flow
import { BEM } from '../../../utilities/classNames'
import baseStyles from '../../../styles/resets/base.css.js'
import { STATES, TEXT_SHADES } from '../../../styles/configs/constants'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'

const bem = BEM('.c-Icon')

const ICON_SIZES = [8, 10, 12, 13, 14, 16, 18, 20, 24, 32, 48]

const caretSize = 12
const defaultSize = 20

const css = `
  ${baseStyles}
  color: currentColor;
  display: block;
  height: ${defaultSize}px;
  position: relative;
  width: ${defaultSize}px;

  // Modifiers
  &.is-center {
    margin-left: auto;
    margin-right: auto;
  }

  &.is-clickable {
    cursor: pointer;
  }

  &.is-inline {
    display: inline-block;
  }

  &.is-noInteract {
    pointer-events: none;
  }

  ${makeShadeStyles()}
  ${makeSizeStyles()}
  ${makeStateColorStyles()}

  &.withCaret {
    ${bem.element('icon')} {
      width: calc(100% - ${caretSize}px);
    }
  }

  ${bem.element('icon')} {
    color: currentColor;
    display: block;
    height: 100%;
    pointer-events: none;

    svg {
      display: block;
      height: 100%;
      max-width: 100%;
      width: 100%;
    }

    circle,
    path,
    rect {
      fill: currentColor;
    }

    &.is-caret {
      height: ${caretSize}px;
      position: absolute;
      right: 0;
      top: calc(50% - ${Math.round(caretSize / 2)}px);
      width: ${caretSize}px;
    }
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
    ICON_SIZES,
    size => `
    &.is-${size} {
      height: ${size}px;
      width: ${size}px;

      &.withCaret {
        width: ${size + caretSize}px;
      }
    }
  `
  )
}

function makeStateColorStyles(): string {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      color: ${getColor('state', state, 'default')};
    }
  `
  )
}

export default css
