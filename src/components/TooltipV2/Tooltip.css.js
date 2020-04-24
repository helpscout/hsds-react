import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const config = {
  background: getColor('charcoal.700'),
  text: 'white',
}

export const ArrowUI = styled.span`
  height: ${({ size }) => size}px;
  pointer-events: none;
  position: absolute;
  width: ${({ size }) => size}px;

  &:before {
    content: '';
    background: ${config.background};
    position: absolute;
    transform: rotate(45deg);
    height: calc(${({ size }) => size}px - 4px);
    width: calc(${({ size }) => size}px - 4px);
    margin: 2px;
  }

  &.is-hidden {
    visibility: hidden;
  }
`

export const TooltipUI = styled.div`
  background-color: ${config.background};
  border-radius: 3px;
  color: ${config.text};
  display: block;
  font-size: 12px;
  max-width: 300px;
  padding: 6px 8px;
  word-break: break-word;
  transition-property: transform, visibility, opacity;
  transition-duration: ${({ animationDuration }) => animationDuration}ms;
  transition-timing-function: ease-in-out;
  opacity: 0;

  ${({ maxWidth }) => (maxWidth ? `max-width: ${maxWidth}px` : '')};
  ${({ minWidth }) => (minWidth ? `min-width: ${minWidth}px` : '')};

  &[data-placement^='top'] {
    ${ArrowUI} {
      bottom: calc((${({ arrowSize }) => arrowSize}px / 2) * -1);
    }
  }

  &[data-placement^='bottom'] {
    ${ArrowUI} {
      top: calc((${({ arrowSize }) => arrowSize}px / 2) * -1);
    }
  }

  &[data-placement^='left'] {
    ${ArrowUI} {
      right: calc((${({ arrowSize }) => arrowSize}px / 2) * -1);
    }
  }

  &[data-placement^='right'] {
    ${ArrowUI} {
      left: calc((${({ arrowSize }) => arrowSize}px / 2) * -1);
    }
  }
`

export const TooltipAnimationUI = styled.div`
  [data-placement^='top'] {
    transform: translateY(12px);
  }

  [data-placement^='bottom'] {
    transform: translateY(-12px);
  }

  [data-placement^='left'] {
    transform: translateX(12px);
  }

  [data-placement^='right'] {
    transform: translateX(-12px);
  }

  [data-entered='true'] {
    transform: translate(0);
    opacity: 1;
  }
`
