import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import HSDSButton from '../Button'

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

export const SplitButtonTogglerUI = styled(HSDSButton)`
  &.SplitButton__Toggler {
    min-width: 30px !important;
    padding: 0;
    pointer-events: all;

    &.is-primary {
      box-shadow: -1px 0 0 ${getColor('blue.600')};

      &.is-success {
        box-shadow: -1px 0 0 ${getColor('green.600')};
      }
      &.is-danger {
        box-shadow: -1px 0 0 ${getColor('red.600')};
      }
      &[disabled] {
        box-shadow: -1px 0 0 ${getColor('grey.600')};
      }
    }

    .c-Button__content {
      padding-top: 2px;
      width: 16px;
    }
  }
`

export const SelectUI = styled('button')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 38px;
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

export const MeatButtonUI = styled('button')`
  width: 24px;
  height: 24px;
  padding: 0.5px 0px 0px 0.5px;
  border: 0;
  border-radius: 3px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }
`

export const IconButtonUI = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 0px;
  border: 0;
  border-radius: 50%;
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: #d5dce1;
  }

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }

  .is-iconName-caret-down {
    margin-left: -3px;
  }
`
