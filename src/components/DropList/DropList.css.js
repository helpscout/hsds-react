import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Icon from '../Icon'

export const DropListWrapperUI = styled('div')`
  box-sizing: border-box;
  width: ${({ variant }) => (variant === 'combobox' ? '220px' : '200px')};
  padding: 0;
  background-color: white;
  border: 1px solid ${getColor('grey.600')};
  border-radius: 4px;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.08);
  font-family: var(--HSDSGlobalFontFamily);
  font-size: 13px;
  color: ${getColor('grey.600')};

  * {
    box-sizing: border-box;
  }

  ${props => (props.menuCSS ? props.menuCSS : '')};
`

export const MenuListUI = styled('ul')`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 5px 0 5px 0;
  list-style: none;

  &.MenuList-Combobox {
    padding: 0 0 5px 0;
  }

  &:focus {
    outline: 0;
  }
`

export const InputSearchHolderUI = styled('div')`
  width: calc(100% - 8px);
  margin: 4px 4px 5px 4px;
  display: ${({ show }) => (show ? 'block' : 'none')};

  input {
    width: 100%;
    height: 38px;
    padding: 0 15px;
    font-family: var(--HSDSGlobalFontFamily);
    font-size: 13px;
    color: ${getColor('charcoal.600')};
    box-shadow: inset 0 0 0 1px ${getColor('grey.600')};
    border: 0;
    border-radius: 3px;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${getColor('blue.500')};
    }
  }
`

export const ListItemUI = styled('li')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  margin: 0 5px 2px;
  padding: 0 10px 0 15px;
  border-radius: 3px;
  line-height: 36px;
  color: ${getColor('charcoal.600')};
  background-color: transparent;
  font-weight: ${props =>
    props.selected && props.withMultipleSelection ? '500' : '400'};
  -moz-osx-font-smoothing: ${({ selected }) =>
    selected ? 'auto' : 'grayscale'};
  -webkit-font-smoothing: ${({ selected }) =>
    selected ? 'auto' : 'antialiased'};
  transition: color ease-in-out 0.1s;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &.is-selected,
  &.is-highlighted.is-selected {
    color: white;
    background-color: ${getColor('blue.600')};
  }

  &.is-highlighted {
    color: ${getColor('charcoal.800')};
    background-color: ${getColor('blue.100')};
  }

  &.with-multiple-selection {
    &.is-highlighted.is-selected {
      color: ${getColor('blue.600')};
      background-color: ${getColor('blue.100')};
    }

    &.is-selected {
      color: ${getColor('blue.600')};
      background-color: white;
    }

    &.is-highlighted {
      color: ${getColor('charcoal.800')};
      background-color: ${getColor('blue.100')};
    }
  }

  &.is-disabled,
  &.with-multiple-selection.is-disabled {
    color: ${getColor('charcoal.200')};
    background-color: transparent;
    cursor: default;
  }
`

export const ListItemTextUI = styled('span')`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .with-multiple-selection & {
    max-width: calc(100% - 30px);
  }
`

export const EmptyListUI = styled('div')`
  height: 36px;
  margin: 0 5px;
  padding: 9px 15px 0;
  font-style: italic;
`

const SelectedBadgeUI = styled('div')`
  width: 24px;
  height: 24px;
  padding: 3px;
  border-radius: 50%;
  color: ${getColor('blue.500')};
  background-color: transparent;
  opacity: 0;
  transition: opacity ease-in-out 0.2s, color ease-in-out 0.2s,
    background-color ease-in-out 0.2s;

  .is-selected &,
  .DropListItem.is-selected:hover & {
    opacity: 1;
    color: white;
    background-color: ${getColor('blue.500')};
  }

  .DropListItem:hover & {
    opacity: 1;
    background-color: white;
  }
`

export const SelectedBadge = ({ isSelected }) => {
  return (
    <SelectedBadgeUI className="SelectedBadge">
      <Icon name="checkmark" size="18" />
    </SelectedBadgeUI>
  )
}

export const DividerUI = styled('div')`
  width: 100%;
  height: 1px;
  margin: 9px 0;
  background-color: ${getColor('grey.500')};
`

export const GroupLabelUI = styled('div')`
  height: 36px;
  margin: 0 5px;
  padding: 0 15px;
  line-height: 36px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: ${getColor('charcoal.200')};

  &:first-child {
    margin-top: 5px;
  }
`

export const A11yTogglerUI = styled('button')`
  display: none;
`
