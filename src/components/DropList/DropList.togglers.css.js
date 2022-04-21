import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import HSDSButton from '../Button'
import IconButton from '../IconButton'
import Icon from '../Icon'

import { focusShadowWithInset } from '../../styles/mixins/focusRing.css'

export const NavLinkTogglerUI = styled('button')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 55px;
  padding: 0 18px;
  background: transparent;
  border: 0;
  font-family: var(--HSDSGlobalFontFamily);
  font-size: 14px;
  color: ${getColor('blue.300')};
  cursor: pointer;

  &.is-active {
    color: white;
  }

  .c-Icon {
    margin: 3px 0 0 3px;
  }
`

export const SplitButtonUI = styled(HSDSButton)`
  &.is-theme-blue {
    --focusRingShadow: ${focusShadowWithInset};
    margin-right: 0;
  }
`

export const SplitButtonTogglerUI = styled(HSDSButton)`
  pointer-events: all;
  --focusRingShadow: ${focusShadowWithInset};

  &:not(.is-style-outlined) {
    &.is-theme-blue {
      box-shadow: -1px 0 0 ${getColor('blue.600')};
    }
    &.is-theme-green {
      box-shadow: -1px 0 0 ${getColor('green.600')};
    }
    &.is-theme-red {
      box-shadow: -1px 0 0 ${getColor('red.600')};
    }
    &[disabled] {
      box-shadow: -1px 0 0 ${getColor('grey.600')};
    }
  }

  &.is-size-lg {
    --buttonMinWidth: 30px;
    padding: 0;
  }

  .c-Button__content {
    padding-top: 2px;
    width: 16px;
  }
`

export const SelectUI = styled('button')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 40px;
  padding: 0 15px;
  margin: 0;
  background: white;
  border: 0;
  box-shadow: inset 0 0 0 1px ${getColor('grey.800')};
  box-sizing: border-box;
  border-radius: 3px;
  font-family: var(--HSDSGlobalFontFamily);
  font-size: 13px;
  color: ${getColor('charcoal.600')};

  &.is-error {
    box-shadow: inset 0 0 0 2px ${getColor('red.500')};
    padding-right: 10px;
  }

  &.is-active,
  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }

  &[disabled] {
    cursor: not-allowed;
    color: ${getColor('charcoal.200')};
  }
`

export const SelectArrowsUI = styled('div')`
  margin-left: auto;
  width: 7px;
  height: 14px;
  position: relative;

  &::before,
  &::after {
    content: '';
    border-left: 3.5px solid transparent;
    border-right: 3.5px solid transparent;
    position: absolute;
    left: 0;
  }

  &::before {
    border-bottom: 6px solid ${getColor('charcoal.700')};
    top: 0;
  }

  &::after {
    border-top: 6px solid ${getColor('charcoal.700')};
    bottom: 0;
  }
`

export const SelectErrorTooltipIconUI = styled('div')`
  margin-left: 8px;
`

export const IconButtonUI = styled(IconButton)`
  &.is-active,
  &[aria-expanded='true'] {
    color: var(--buttonColorHover);

    &:not(:focus-visible) {
      background-color: var(--buttonBackgroundColorHover);
    }
  }

  &.is-active + .iconbtn-chevron,
  &:hover + .iconbtn-chevron {
    color: var(--buttonColorHover);
  }

  &:focus,
  &.is-focused {
    &:before {
      opacity: ${({ seamless }) => (seamless ? '0 !important' : '1')};
    }
  }
`

export const IconBtnChevronUI = styled(Icon)`
  display: block;
  margin-left: ${({ $adjustPosition }) => `${$adjustPosition}px`};
  color: ${getColor('charcoal.400')};
`

export const IconBtnWrapperUI = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
