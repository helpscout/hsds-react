// Deprecated
/* istanbul ignore file */
import { SELECTORS } from './Dropdown.utils'
import styled from 'styled-components'
import Card from '../Card'

import { getColor, rgba } from '@hsds/utils-color'

export const DropdownUI = styled('div')`
  position: relative;
`

export const MenuContainerUI = styled('div')`
  position: absolute;
  font-family: var(--HSDSGlobalFontFamily);
  font-size: var(--HSDSGlobalFontSize);

  &.is-dropUp {
    bottom: calc(100% + 5px);
  }

  &.is-dropLeft {
    right: 0%;
  }

  &:not(.is-dropUp) {
    top: 5px;
  }

  .c-DropdownBlock + .c-DropdownBlock {
    border-top: 1px solid ${getColor('grey.600')};
  }
`

export const CardUI = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 30px;
  min-width: 160px;
  max-height: 360px;
`

CardUI.defaultProps = {
  floating: true,
  seamless: true,
}

export const MenuWrapperUI = styled('div')`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
  min-height: 0;
  height: 100%;
  width: 100%;
`

export const MenuUI = styled('div')`
  padding: 8px 0;
  width: 100%;
`

MenuUI.defaultProps = {
  [SELECTORS.menuAttribute]: true,
  floating: true,
}

export const BlockUI = styled('div')`
  flex: none;
  padding: 8px 16px;
  min-height: 0;
  max-height: 100%;

  &.is-seamless {
    padding: 0;
  }

  &.is-stretchy {
    flex: 1;
  }
`

export const WrapperUI = styled('div')`
  visibility: hidden;
  pointer-events: none;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 15%;
    right: calc(100% - 20px);
    top: 34px;
    height: 50%;
  }
`

WrapperUI.defaultProps = {
  [SELECTORS.wrapperAttribute]: true,
}

export const ActionUI = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;

  &.is-open {
    background-color: ${rgba(getColor('grey.300'), 1)};
    color: ${getColor('link.base')};

    ${MenuUI} {
      color: initial;
    }
  }

  &:active {
    background-color: ${rgba(getColor('grey.400'), 1)};
  }
`

ActionUI.defaultProps = {
  [SELECTORS.actionAttribute]: true,
}

export const ActionContentUI = styled('div')`
  flex: 1;
  min-width: 0;
  max-width: 100%;
`

export const ItemUI = styled.div`
  background-color: ${rgba(getColor('grey.400'), 0)};
  border-radius: 0 !important;
  color: ${getColor('charcoal.400')};
  cursor: pointer;
  display: block;
  outline: none;
  position: static;
  text-decoration: none;
  transition: background-color 0.1s ease;
  user-select: none;

  &.is-option {
    padding: 8px 16px;
  }

  &.is-active {
    > ${ActionUI}, &.is-option {
      font-weight: 500;
    }
  }

  &.c-SelectionClearerItem + .c-DropdownItem {
    padding-top: 12px;
  }

  &:focus {
    ${MenuUI} {
      color: initial;
    }
  }

  &:hover {
    text-decoration: none;
  }

  &:last-child {
    border: none;
  }

  ${WrapperUI} {
    position: absolute;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: -20px;
    margin-right: -20px;
  }

  &.is-focused {
    > ${ActionUI}, &.is-option {
      background-color: ${rgba(getColor('grey.300'), 1)};
      color: ${getColor('link.base')};
    }
  }
  &.is-focused:hover,
  &.is-open {
    > ${WrapperUI} {
      visibility: visible;
      pointer-events: auto;
    }
  }

  &.is-disabled {
    cursor: initial;
    pointer-events: none;
    opacity: 0.4;
  }
`

ItemUI.defaultProps = {
  [SELECTORS.itemAttribute]: true,
}

export const GroupUI = styled('div')`
  margin-top: 0;

  & + & {
    margin-top: 10px;
  }
`

export const HeaderUI = styled('div')`
  padding: 8px 16px;
`

export const DividerUI = styled('div')`
  background-color: ${getColor('grey.400')};
  margin: 8px 0;
  height: 1px;
`

export const TriggerUI = styled('span')`
  color: ${getColor('link.base')};
  cursor: pointer;
  display: inline-block;
  outline: none;

  &.is-disabled {
    color: ${getColor('charcoal.200')};
    pointer-events: none;
  }

  &.is-open {
    color: ${getColor('blue.700')};
  }

  & > * {
    pointer-events: none;
  }
`

TriggerUI.defaultProps = {
  [SELECTORS.triggerAttribute]: true,
  tabIndex: 0,
}

export const SubMenuIncidatorUI = styled('div')`
  pointer-events: none;
  margin-right: -8px;
  min-width: 0;
`

export const ItemSelectedCheckUI = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;

  &.is-selectionClearer-active {
    font-weight: bold;
  }
`

export const SelectedCheckmarkUI = styled('div')`
  width: 28px;
  padding-left: 4px;
  margin-left: auto;

  .c-Icon {
    right: -4px;
  }
`
