import { BEM } from '../../utilities/classNames'

import { STATES, TEXT_SHADES } from '../../styles/configs/constants'
import { getColor } from '../../styles/utilities/color'
import forEach from '../../styles/utilities/forEach'
import styled from 'styled-components'

const bem = BEM('.c-Icon')

const ICON_SIZES = [8, 10, 12, 13, 14, 15, 16, 18, 20, 24, 32, 48, 52, 72]

export const config = {
  caretSize: 13,
  marginOffset: 4,
  offsetRight: '6px',
  offsetTop: '1px',
  size: 20,
}

export const IconUI = styled.span`
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
    margin-right: ${config.marginOffset}px;
  }

  &.is-offsetRight {
    margin-left: ${config.marginOffset}px;
  }

  ${makeShadeStyles()};
  ${makeSizeStyles()};
  ${makeStateColorStyles()};

  &.withCaret {
    ${bem.element('icon')} {
      width: calc(100% - (${config.caretSize}px - ${config.offsetRight}));
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

    circle[fill],
    path,
    rect[fill] {
      fill: currentColor;
    }
    path[stroke] {
      fill: none;
    }
    circle[stroke],
    path[stroke],
    rect[stroke] {
      stroke: currentColor;
    }

    &.is-caret {
      height: ${config.caretSize}px;
      position: absolute;
      right: 0;
      top: calc(
        50% - ${Math.round(config.caretSize / 2)}px + ${config.offsetTop}
      );
      width: ${config.caretSize}px;
    }
  }
`

function makeShadeStyles() {
  return forEach(
    TEXT_SHADES,
    shade => `
    &.is-${shade} {
      color: ${getColor('text', shade)};
    }
  `
  )
}

function makeSizeStyles() {
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

function makeStateColorStyles() {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      color: ${getColor('state', state, 'default')};
    }
  `
  )
}
