import styled from '../styled'
import { makeFieldStyles } from '../Input/styles/Input.css.js'
import { getColor } from '../../styles/utilities/color'

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

export const FieldUI = styled('select')`
  ${makeFieldStyles};
  padding-left: 8px;
  padding-right: 20px;

  &.has-placeholder {
    opacity: 0.3;
  }
`

export const SelectArrowsUI = styled('div')`
  align-self: center;
  color: ${getColor('charcoal.400')};
  display: block;
  padding: 0 12px;
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  z-index: 1;

  &::before {
    border-bottom: 4px solid currentColor;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    bottom: 0;
    content: '';
    margin: 2px;
    position: absolute;
  }

  &::after {
    border-top: 4px solid currentColor;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    content: '';
    margin: 2px;
    position: absolute;
    top: 0;
  }

  &.is-error {
    right: 40px;
  }
`
