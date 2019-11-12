import styled from 'styled-components'
import { getColor, rgba } from '../../styles/utilities/color'
import Icon from '../Icon/index'

export const DropdownHeaderUI = styled.div`
  padding: 8px 16px;
`

export const DropdownDividerUI = styled.div`
  border-bottom: 1px solid ${getColor('grey.400')};
  height: 1px;
  margin: 5px 0;
  overflow: hidden;
  padding: 0;
`

export const DropdownItemUI = styled.div`
  cursor: pointer;
  padding: 0;
  user-select: none;

  &:last-child {
    border: none;
  }

  &.is-hover,
  &.is-focused {
    background-color: ${getColor('grey.300')};
  }
  &.is-selected {
    background-color: ${getColor('blue.default')};
    color: white;
  }

  .c-DropdownItem__link {
    background-color: ${rgba(getColor('grey.400'), 0)};
    display: block;
    outline: none;
    padding: 8px 16px;
    transition: background-color 0.1s ease;

    &:active {
      background-color: ${getColor('grey.400')};
    }
  }

  .c-DropdownItem__submenu-icon {
    margin-right: -8px;
  }

  &.is-disabled {
    color: ${getColor('charcoal.300')};
    cursor: not-allowed;
    &.is-hover {
      background-color: transparent;
    }
    &.is-focused {
      background-color: ${rgba(getColor('grey.300'), 0.5)};
    }
    &.is-selected {
      background-color: transparent;
      color: ${getColor('charcoal.300')};
    }

    .c-DropdownItem__link {
      &:active {
        background-color: transparent;
      }
    }
  }
`

export const DropdownMenuUI = styled.div`
  position: relative;
  width: 200px;
  z-index: 1;

  .c-DropdownMenu__content {
    min-height: 60px;
  }

  .c-DropdownMenu__list {
    margin: 0;
    padding: 5px 0;
  }

  &.is-sub-menu {
    margin-top: -6px;
  }
`

export const DropdownTriggerIconUI = styled(Icon)`
  position: relative;
  right: -4px;
  top: 2px;
`
