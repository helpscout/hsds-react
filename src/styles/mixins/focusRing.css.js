import { css } from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const focusShadow = `0 0 0 2px ${getColor('blue.500')};`

export const focusShadowWithInset = `
  0 0 0 2px ${getColor('blue.500')}, inset 0 0 0 2px white;
`

export const focusRing = css`
  --focusRingOffset: -2px;
  outline: none;
  position: relative;

  &:before {
    content: '';
    border-radius: inherit;
    bottom: var(--focusRingOffset);
    box-shadow: ${focusShadow};
    left: var(--focusRingOffset);
    pointer-events: none;
    position: absolute;
    right: var(--focusRingOffset);
    top: var(--focusRingOffset);
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
