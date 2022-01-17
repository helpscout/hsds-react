import { css } from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const focusShadow = `0 0 0 2px var(--focusRingColor, ${getColor(
  'blue.500'
)});`

export const focusShadowWithInset = `
  0 0 0 2px var(--focusRingColor, ${getColor(
    'blue.500'
  )}), inset 0 0 0 2px white;
`

export const focusRing = css`
  --focusRingColor: ${getColor('blue.500')};
  --focusRingOffset: -2px;
  --focusRingShadow: ${focusShadow};
  --focusRingRadius: inherit;
  outline: none;
  position: relative;

  &:before {
    content: '';
    border-radius: var(--focusRingRadius);
    bottom: var(--focusRingOffset);
    box-shadow: var(--focusRingShadow);
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
