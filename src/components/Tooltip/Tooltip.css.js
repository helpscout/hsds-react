import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const config = {
  background: getColor('charcoal.700'),
  text: 'white',
}

export const TooltipTriggerUI = styled.span`
  display: ${({ display }) => (display ? display : 'inline-block')};
`

export const ArrowUI = styled.span`
  position: absolute;
  height: ${({ arrowSize }) => arrowSize}px;
  width: ${({ arrowSize }) => arrowSize}px;
  pointer-events: none;

  &:before {
    content: '';
    background: ${config.background};
    position: absolute;
    transform: rotate(45deg);
    height: calc(${({ arrowSize }) => arrowSize}px - 4px);
    width: calc(${({ arrowSize }) => arrowSize}px - 4px);
    margin: 2px;
    left: 0;
  }

  &.is-hidden {
    visibility: hidden;
  }
`

export const TooltipUI = styled.div`
  /* in case scoping is not working */
  box-sizing: border-box;
  font-family: var(--HSDSGlobalFontFamily);

  background-color: ${config.background};
  border-radius: 3px;
  color: ${config.text};
  display: block;
  font-size: 12px;
  max-width: 300px;
  padding: 6px 8px;
  transition-property: transform, visibility, opacity;
  transition-duration: ${({ animationDuration }) => animationDuration}ms;
  transition-timing-function: ease-in-out;
  opacity: 0;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;

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
