import styled from 'styled-components'
import { makeFieldStyles } from '../Input/Input.css'
import { getColor } from '@hsds/utils-color'
export { InlinePrefixSuffixUI } from '../Input/Input.css'

export const SelectUI = styled('div')`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  padding-bottom: 1px;
  padding-top: 1px;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;

  & > *:first-child {
    padding-left: 0;
  }

  &.is-focused {
    z-index: 2;
  }
`

export const ItemUI = styled('div')`
  position: relative;
  z-index: 1;

  &.is-icon {
    margin-right: -4px;
  }
`

export const FieldUI = styled('select')`
  ${getFirefoxStyles()};

  &.c-InputField {
    ${makeFieldStyles};
    padding-left: 8px;
    padding-right: 20px;

    &:first-child {
      padding-left: 0;
    }
  }

  &.has-placeholder {
    opacity: 0.3;
  }
`

export const SelectArrowsUI = styled('div')`
  align-self: center;
  color: ${getColor('charcoal.600')};
  display: block;
  padding: 0 12px;
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    margin: 2px;
    position: absolute;
  }

  &::before {
    border-bottom: 5px solid currentColor;
    bottom: -1px;
  }

  &::after {
    border-top: 5px solid currentColor;
    top: -1px;
  }

  &.is-error {
    right: 40px;
  }

  ${({ disabled }) => {
    const color = disabled ? 'charcoal.200' : 'charcoal.600'
    return `color: ${getColor(color)} !important;`
  }}
`

function getFirefoxStyles() {
  // Removes outline in Firefox
  // https://stackoverflow.com/questions/3773430/remove-outline-from-select-box-in-ff/11603104#11603104
  return `
    @-moz-document url-prefix() {
      color: transparent !important;
      text-shadow: 0 0 0 black !important;
    }
  `
}
