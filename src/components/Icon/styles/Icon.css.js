// @flow
import { BEM } from '../../../utilities/classNames'
import baseStyles from '../../../styles/resets/base.css.js'
import { STATES, TEXT_SHADES } from '../../../styles/configs/constants'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'

const bem = BEM('.c-Icon')

const ICON_SIZES = [8, 10, 12, 13, 14, 16, 18, 20, 24, 32, 48, 52]

export const config = {
  caretSize: 12,
  offset: 4,
  size: 20,
}

const css = `
  ${baseStyles};
  color: currentColor;
  display: block;
  height: ${config.size}px;
  position: relative;
  width: ${config.size}px;

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

  &.is-offsetLeft {
    margin-right: ${config.offset}px;
  }

  &.is-offsetRight {
    margin-left: ${config.offset}px;
  }

  ${makeShadeStyles()};
  ${makeSizeStyles()};
  ${makeStateColorStyles()};

  &.withCaret {
    ${bem.element('icon')} {
      width: calc(100% - ${config.caretSize}px);
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
      height: ${config.caretSize}px;
      position: absolute;
      right: 0;
      top: calc(50% - ${Math.round(config.caretSize / 2)}px);
      width: ${config.caretSize}px;
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
        width: ${size + config.caretSize}px;
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
