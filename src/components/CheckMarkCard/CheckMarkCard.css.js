import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'

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
  border: 1px solid ${rgba(getColor('grey.700'), 0.7)};
  border-radius: 4px;
  background: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.15s;
  will-change: box-shadow, border;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &.is-checked,
  &.is-focused,
  &.is-focused.is-checked,
  &:focus-within,
  &.is-checked:focus-within {
    border-color: transparent;
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      transform: translateY(0);
    }
  }

  &.is-locked {
    cursor: default;
    border-color: transparent;
    box-shadow: 0px 0px 0 2px ${getColor('lavender.600')};

    &:hover {
      transform: translateY(0);
    }
  }
`

export const MarkUI = styled('div')`
  position: absolute;
  top: -2px;
  left: -2px;
  height: 28px;
  width: 28px;
  border-radius: 4px 0px 5px;
  opacity: ${({ kind }) => (kind ? '1' : '0')};
  transition: opacity 0.15s;
  will-change: opacity;
  background: ${({ kind }) => getMarkColor(kind)};

  .mark-icon {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

function getMarkColor(kind) {
  switch (kind) {
    case 'checkmark':
      return getColor('blue.500')

    case 'lock-closed':
      return getColor('lavender.600')

    default:
      return getColor('blue.500')
  }
}
