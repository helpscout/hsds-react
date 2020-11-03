import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { d400, d400Effect } from '../../styles/mixins/depth.css'
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
  border-radius: 4px;
  ${d400}
  cursor: pointer;

  &:hover {
    ${d400Effect}
    transform: translateY(-2px);
  }

  &.is-checked,
  &.is-focused,
  &.is-focused.is-checked,
  &:focus-within,
  &.is-checked:focus-within {
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
  }

  &.is-disabled {
    ${d400}
    color: ${rgba(getColor('charcoal.500'), 0.85)};
    opacity: 0.8;
    cursor: not-allowed;

    &:hover {
      ${d400}
      transform: translateY(0);
    }
  }

  &.with-status {
    cursor: default;
    box-shadow: 0px 0px 0 2px
      ${({ withStatus }) =>
        Boolean(withStatus) ? withStatus.color : 'rgba(0, 0, 0, 0.1)'};

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
  opacity: ${({ markShown }) => (markShown ? '1' : '0')};
  transition: opacity 0.15s;
  will-change: opacity;
  background: ${({ color }) => color};
  z-index: 100;

  .mark-icon {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .TooltipTrigger {
    display: block;
    width: 100%;
    height: 100%;
  }
`
