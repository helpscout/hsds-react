import base from '../../styles/resets/base.css.js'
import styled from '../styled'

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
    default: '24px',
    md: '24px',
    sm: '16px',
  },
  transition: 'opacity 100ms linear',
  transformHover: 'translateY(-2px)',
  svgTransition: 'fill 200ms linear',
}

export const IconUI = styled('span')`
  color: currentColor;
  display: block;
  height: 100%;
  pointer-events: none;
  position: relative;

  svg {
    display: block;
    height: 100%;
    max-width: 100%;
    width: 100%;
  }
`

export const FaceUI = styled('div')`
  background: ${config.colors.off.head};
  border-radius: 9999px;
  height: 100%;
  overflow: hidden;
  transition: background 100ms linear;
  width: 100%;

  &.is-active {
    background: ${config.colors.on.head};
  }
`

export const EmoticonUI = styled('span')`
  ${base};
  color: currentColor;
  cursor: pointer;
  display: block;
  height: ${config.size.default};
  opacity: 1;
  position: relative;
  transform: translateY(0);
  transition: ${config.transition};
  width: ${config.size.default};
  user-select: none;

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  path {
    fill: ${config.colors.off.face};
    transition: ${config.svgTransition};
  }

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

  &.is-active,
  &:hover {
    ${FaceUI} {
      background: ${config.colors.on.head};
    }
    path {
      fill: ${config.colors.on.face};
    }
  }

  &.is-md {
    height: ${config.size.md};
    width: ${config.size.md};
  }
  &.is-sm {
    height: ${config.size.sm};
    width: ${config.size.sm};
  }

  &.is-withAnimation {
    &:hover {
      &.is-happy ${IconUI} {
        animation: HSDSEmoticonYep 1.5s steps(5, start) 0.15s forwards;
      }

      &.is-sad ${IconUI} {
        animation: HSDSEmoticonNotReally 1.5s steps(5, start) 0.15s forwards;
      }
    }
  }

  @keyframes HSDSEmoticonYep {
    0%,
    100% {
      transform: translateY(0);
    }
    10%,
    30%,
    50%,
    70% {
      transform: translateY(-3.5px);
    }
    20%,
    40%,
    60% {
      transform: translateY(3.5px);
    }
    80% {
      transform: translateY(2.6px);
    }
    90% {
      transform: translateY(-2.6px);
    }
  }

  @keyframes HSDSEmoticonNotReally {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      transform: translateX(-3.5px);
    }
    20%,
    40%,
    60% {
      transform: translateX(3.5px);
    }
    80% {
      transform: translateX(2.6px);
    }
    90% {
      transform: translateX(-2.6px);
    }
  }
`

export default EmoticonUI
