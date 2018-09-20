// @flow
import base from '../../../styles/resets/base.css.js'
import styled from '../../styled'

export const config = {
  colors: {
    on: {
      head: '#FFE8B5',
      face: '#d79400',
    },
    off: {
      head: '#e3e8eb',
      face: '#a5b2bd',
    },
  },
  size: {
    default: '26px',
    md: '26px',
    sm: '16px',
  },
  transition: 'opacity 100ms linear, transform 100ms linear',
  transformHover: 'translateY(-2px)',
  svgTransition: 'fill 200ms linear',
}

export const EmoticonUI = styled('span')`
  ${base} color: currentColor;
  cursor: pointer;
  display: block;
  height: ${config.size.default};
  opacity: 1;
  position: relative;
  transform: translateY(0);
  transition: ${config.transition};
  width: ${config.size.default};

  &:hover {
    transform: ${config.transformHover};
  }
  &:active {
    transform: translateY(0);
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__icon {
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
  }

  .c-Emoticon__pathHead,
  .c-Emoticon__pathFace {
    transition: ${config.svgTransition};
  }

  .c-Emoticon__pathHead {
    fill: ${config.colors.off.head};
  }
  .c-Emoticon__pathFace {
    fill: ${config.colors.off.face};
  }

  /**
   * Modifiers
   */
  // Alignment
  &.is-center {
    margin-left: auto;
    margin-right: auto;
  }

  &.is-inline {
    display: inline-block;
  }

  // Interactions
  &.is-noInteract {
    cursor: initial;
    pointer-events: none;
  }

  // Color
  &.is-active,
  &:hover {
    .c-Emoticon__pathHead {
      fill: ${config.colors.on.head};
    }
    .c-Emoticon__pathFace {
      fill: ${config.colors.on.face};
    }
  }

  // Size
  &.is-md {
    height: ${config.size.md};
    width: ${config.size.md};
  }
  &.is-sm {
    height: ${config.size.sm};
    width: ${config.size.sm};
  }
`

export default EmoticonUI
