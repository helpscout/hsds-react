import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import { defaultAnimation as overlayAnimation } from '../../hooks/useAnimatedRender'

const sidePanelDefaultAnimation = `
.right &.element-in {
  animation: slideRightIn 0.3s;
}
.left &.element-in {
  animation: slideLeftIn 0.3s;
}

@keyframes slideRightIn {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideLeftIn {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
`

export const OverlayUI = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  z-index: ${({ zIndex }) => zIndex};
  background-color: ${rgba(getColor('blue.800'), 0.3)};

  &.no-overlay {
    background-color: transparent;
    pointer-events: none;
  }

  &.left {
    flex-direction: row;
  }

  ${overlayAnimation}
`

export const SidePanelUI = styled('aside')`
  position: relative;
  flex-direction: column;
  background-color: ${getColor('grey.300')};
  width: ${({ panelWidth }) => panelWidth};
  pointer-events: all;
  display: none;

  &.element-in {
    display: flex;
  }

  .no-overlay & {
    pointer-events: all;
  }

  @media screen and (prefers-reduced-motion: no-preference) {
    ${sidePanelDefaultAnimation}
  }

  &:focus {
    outline: none;
  }
`

export const ContentUI = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`

export const ClosePanelButtonUI = styled('button')`
  position: absolute;
  padding: 5px;
  background: #fff;
  border: 0;
  border-radius: 4px;
  color: ${getColor('charcoal.400')};
  top: 20px;
  right: 20px;

  &:hover {
    color: ${getColor('charcoal.600')};
    cursor: pointer;
  }

  &:active,
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${getColor('blue.400')};
  }
`
