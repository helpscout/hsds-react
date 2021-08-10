import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import { overlayDefaultAnimation } from '../../hooks/useAnimatedRender'

const sidePanelDefaultAnimation = `
animation: slideOut 0.3s;

.element-in.right & {
  animation: slideRightIn 0.3s;
}
.element-in.left & {
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
  z-index: ${({ zIndex }) => zIndex};
  background-color: ${rgba(getColor('blue.800'), 0.3)};

  &.no-overlay {
    background-color: transparent;
    pointer-events: none;
  }

  &.left {
    flex-direction: row;
  }

  ${overlayDefaultAnimation}
`

export const SidePanelUI = styled('aside')`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${getColor('grey.300')};
  width: ${({ panelWidth }) => panelWidth};
  pointer-events: all;

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

export const HeaderUI = styled('header')`
  width: 100%;
  height: 125px;
  padding: 30px;
  background-color: #fff;

  h1.SidePanel__Heading {
    margin: 10px 0 4px 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: ${getColor('charcoal.700')};
  }

  p.SidePanel__Subheading {
    margin: 0;
    font-size: 13px;
    line-height: 19px;
    color: ${getColor('charcoal.300')};
  }
`

export const BodyUI = styled('div')`
  width: 100%;
  background-color: transparent;
  flex-grow: 1;
  padding: 18px;
`

export const FooterUI = styled('footer')`
  width: 100%;
  height: 90px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 -1px 0 0 ${getColor('ash.500')},
    0 -5px 0 0 ${getColor('ash.400')};

  .c-Button {
    width: 100%;
  }
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
