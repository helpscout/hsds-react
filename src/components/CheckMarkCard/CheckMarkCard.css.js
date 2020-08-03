import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const CheckMarkCardUI = styled('label')`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100px')};
  height: ${({ height }) => (height ? height : 'auto')};
  min-height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background: white;
  box-shadow: 0px 5px 8px rgba(99, 116, 134, 0.03),
    0px 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.15s;
  will-change: box-shadow, border;
  cursor: pointer;

  &:hover {
    border: 1px solid ${getColor('grey.500')};
    box-shadow: 0px 5px 8px rgba(99, 116, 134, 0.03),
      0px 2px 8px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }

  &.is-focused,
  &.is-focused.is-checked,
  &:focus-within,
  &.is-checked:focus-within {
    border-color: transparent;
    /* border-radius: 7px; */
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
  }

  &.is-checked {
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.04);
      box-shadow: 0px 5px 8px rgba(99, 116, 134, 0.03),
        0px 2px 8px rgba(0, 0, 0, 0.04);
      transform: translateY(0);
    }
  }
`

export const CheckMarkUI = styled('div')`
  position: absolute;
  top: -2px;
  left: -2px;
  height: 28px;
  width: 28px;
  border-radius: 4px 0px 5px;
  background: ${getColor('blue.500')};
  opacity: 0;
  transition: opacity 0.15s;
  will-change: opacity;

  .is-checked & {
    opacity: 1;
  }

  .checkmark-icon {
    color: white;
    position: absolute;
    top: calc(50% - 13px);
    left: calc(50% - 13px);
  }
`
