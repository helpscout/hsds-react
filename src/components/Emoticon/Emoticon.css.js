import base from '../../styles/resets/base.css.js'
import styled from '../styled'

export const config = {
  size: {
    lg: '24px',
    md: '20px',
    sm: '16px',
  },
}

export const IconUI = styled('span')`
  display: block;
  height: 100%;
  pointer-events: none;
  position: relative;

  svg {
    display: block;
  }
`

export const EmoticonUI = styled('span')`
  display: block;
  height: ${({ size }) => config.size[size]};
  width: ${({ size }) => config.size[size]};
  opacity: 1;
  position: relative;
  user-select: none;

  /**
   * Modifiers
   */
  &.is-center {
    margin-left: auto;
    margin-right: auto;
  }

  &.is-inline {
    display: inline-block;
  }

  &.is-noInteract {
    cursor: initial;
    pointer-events: none;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: initial;
    pointer-events: none;
  }
`

export default EmoticonUI
