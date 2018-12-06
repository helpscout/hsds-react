import styled from '../styled'
import { getColor } from '../../styles/utilities/color'

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
