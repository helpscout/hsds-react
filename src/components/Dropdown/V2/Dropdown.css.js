import { rgba } from 'polished'
import { SELECTORS } from './Dropdown.utils'
import styled from '../../styled'
import Card from '../../Card'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'

export const DropdownUI = styled('div')`
  ${baseStyles};
  position: relative;
`

export const MenuContainerUI = styled('div')`
  ${baseStyles};
  position: absolute;

  &.is-dropUp {
    bottom: 100%;
  }

  &.is-dropLeft {
    right: 0%;
  }

  .c-DropdownV2Block + .c-DropdownV2Block {
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

export const MenuUI = styled('div')`
  ${baseStyles};
  padding: 8px 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
  height: 100%;
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
  ${baseStyles};
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
  ${baseStyles};
  padding: 8px 16px;

  &.is-open {
    background-color: ${rgba(getColor('grey.300'), 1)};
    color: ${getColor('blue.500')};

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

export const ItemUI = styled('div')`
  ${baseStyles};
  background-color: ${rgba(getColor('grey.400'), 0)};
  border-radius: 0 !important;
  cursor: pointer;
  display: block;
  outline: none;
  position: static;
  transition: background-color 0.1s ease;
  user-select: none;

  &.is-active {
    > ${ActionUI} {
      font-weight: bold;
    }
  }

  &:focus {
    ${MenuUI} {
      color: initial;
    }
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
    > ${ActionUI} {
      background-color: ${rgba(getColor('grey.300'), 1)};
      color: ${getColor('blue.500')};
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

export const TriggerUI = styled('a')`
  ${baseStyles};
  color: ${getColor('blue.500')};
  cursor: pointer;
  display: inline-block;
  outline: none;

  &.is-open {
    color: ${getColor('blue.700')};
  }
`

TriggerUI.defaultProps = {
  tabIndex: 0,
}

export const SubMenuIncidatorUI = styled('div')`
  pointer-events: none;
  margin-right: -8px;
`
