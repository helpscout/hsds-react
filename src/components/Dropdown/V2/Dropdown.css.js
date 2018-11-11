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
  padding: 8px 0;
  min-height: 30px;
  min-width: 160px;
  overflow-y: auto;
  max-height: 100px;
`

MenuUI.defaultProps = {
  floating: true,
}

export const WrapperUI = styled('div')`
  display: none;
  position: relative;
  top: 0;
`

export const ActionUI = styled('div')`
  padding: 8px 16px;

  &:hover,
  &:focus {
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

export const ItemUI = styled('div')`
  background-color: ${rgba(getColor('grey.400'), 0)};
  border-radius: 0 !important;
  cursor: pointer;
  display: block;
  outline: none;
  position: static;
  transition: background-color 0.1s ease;
  user-select: none;

  &:hover {
    background-color: ${rgba(getColor('grey.300'), 1)};
    color: ${getColor('blue.500')};

    > ${WrapperUI} {
      display: block;
    }

    ${MenuUI} {
      color: initial;
    }
  }

  &:last-child {
    border: none;
  }

  ${WrapperUI} {
    position: absolute;
    left: 100%;
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
