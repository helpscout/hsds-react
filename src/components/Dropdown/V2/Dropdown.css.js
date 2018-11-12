import { rgba } from 'polished'
import styled from '../../styled'
import Card from '../../Card'
import { getColor } from '../../../styles/utilities/color'

export const DropdownUI = styled('div')`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`

export const MenuUI = styled(Card)`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  padding: 8px 0;
  min-height: 30px;
  min-width: 160px;
  overflow-y: auto;
  max-height: 360px;
`

MenuUI.defaultProps = {
  'data-hsds-menu': true,
  floating: true,
}

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
  'data-hsds-menu-wrapper': true,
}

export const ActionUI = styled('div')`
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
  'data-hsds-menu-action': true,
}

export const ItemUI = styled('div')`
  background-color: ${rgba(getColor('grey.400'), 0)};
  border-radius: 0 !important;
  cursor: pointer;
  display: block;
  outline: none;
  position: static;
  transition: background-color 0.1s ease;
  user-select: none;

  &:focus {
    /* background-color: ${rgba(getColor('grey.300'), 1)};
    color: ${getColor('blue.500')}; */

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

  &.is-hover {
    > ${ActionUI} {
      background-color: ${rgba(getColor('grey.300'), 1)};
      color: ${getColor('blue.500')};
    }
  }
  &.is-hover:hover,
  &.is-open {
    > ${WrapperUI} {
      visibility: visible;
      pointer-events: auto;
    }
  }
`
ItemUI.defaultProps = {
  'data-hsds-menu-item': true,
  tabIndex: 0,
}

export const LinkUI = styled('div')``
LinkUI.defaultProps = {
  'data-hsds-menu-link': true,
}
