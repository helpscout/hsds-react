import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { d400, d400Effect } from '../../styles/mixins/depth.css'
import { rgba } from '../../utilities/color'
import {
  overlayDefaultAnimation,
  sidePanelDefaultAnimation,
} from './SidePanel.animations'

export const AppContainerUI = styled('div')`
  width: 100%;
  height: calc(100vh - 2rem);
  background-color: #e5e5f7;
  background-size: 10px 10px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
`

export const FakeNavUI = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background-color: #444cf7;

  .c-ChoiceGroup {
    margin-right: 20px;
  }
  .c-FormGroupChoice {
    margin-bottom: 0;
    color: white;
  }
`

export const FakeCardUI = styled('div')`
  ${d400}
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 4px;

  &:hover {
    ${d400Effect}
  }
`

export const FakeMainUI = styled('main')`
  position: relative;
  width: 100%;
  height: calc(100vh - 40px - 2rem);
  padding: 30px;
  background-color: #e5e5f7;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
`

export const OverlayUI = styled('div')`
  width: 100%;
  background-color: ${rgba(getColor('blue.800'), 0.3)};
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ zindex }) => zindex};

  &.left {
    flex-direction: row;
  }

  ${overlayDefaultAnimation}
`

export const SidePanelUI = styled('aside')`
  display: flex;
  flex-direction: column;
  background-color: ${getColor('grey.300')};
  width: ${({ panelWidth }) => panelWidth};

  ${sidePanelDefaultAnimation}
`

export const HeaderUI = styled('header')`
  position: relative;
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

export const ClosePanelButtonUI = styled('button')`
  position: absolute;
  padding: 5px;
  background: #fff;
  border: 0;
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
  }
`

export const BodyUI = styled('div')`
  width: 100%;
  background-color: transparent;
  flex-grow: 1;
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
