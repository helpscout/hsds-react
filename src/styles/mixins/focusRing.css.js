import { css } from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const focusShadow = `
  0 0 0 2px ${getColor('blue.500')};
`
export const focusShadowWithInset = `
  0 0 0 2px ${getColor('blue.500')}, inset 0 0 2px 2px white;
`

export const focusRing = css`
  outline: none;
  position: relative;

  &:before {
    content: '';
    border-radius: 4px;
    bottom: -2px;
    box-shadow: ${focusShadow};
    left: -2px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -2px;
    opacity: 0;
    background: transparent;
    z-index: 3;
  }

  &:focus,
  &.is-focused {
    &:before {
      opacity: 1;
    }
  }

  &:focus:not(:focus-visible) {
    &:before {
      opacity: 0;
    }
  }

  &:focus-visible {
    &:before {
      opacity: 1 !important;
      transition: opacity ease 0.2s;
    }
  }
`
