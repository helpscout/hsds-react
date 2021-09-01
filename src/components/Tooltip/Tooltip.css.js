import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { KeyboardBadgeUI } from '../KeyboardBadge/KeyboardBadge.css'

export const TooltipTriggerUI = styled.span`
  display: ${({ display }) => (display ? display : 'inline-block')};

  &:focus {
    outline: 0;
  }
`

export const ArrowUI = styled.span`
  position: absolute;
  height: ${({ arrowSize }) => arrowSize}px;
  width: ${({ arrowSize }) => arrowSize}px;
  pointer-events: none;

  &:before {
    content: '';
    background-color: var(--TooltipBgColor);
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
  --TooltipBgColor: ${getColor('charcoal.800')};
  /* in case scoping is not working */
  box-sizing: border-box;
  font-family: var(--HSDSGlobalFontFamily);
  width: max-content;
  background-color: var(--TooltipBgColor);
  border-radius: 4px;
  color: white;
  display: block;
  font-size: 13px;
  max-width: 300px;
  padding: 6px 8px;
  transition-property: transform, visibility, opacity;
  transition-duration: ${({ animationDuration }) => animationDuration}ms;
  transition-timing-function: ease-in-out;
  opacity: 0;
  line-height: 1;
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

  &.with-badge {
    padding-left: 10px;
    padding-right: 6px;
    display: flex;
    align-items: center;
    text-align: left;

    ${KeyboardBadgeUI} {
      margin-left: 8px;
      flex: 0 0 auto;
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
