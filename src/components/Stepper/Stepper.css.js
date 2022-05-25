import styled from 'styled-components'
import Text from '../Text'

import { getColor } from '@hsds/utils-color'

export const config = {
  activeColor: getColor('green.500'),
  backgroundColor: 'white',
  inactiveColor: getColor('grey.500'),
  circleSize: '15px',
  lineHeight: '3px',
  lineColor: getColor('grey.400'),
  progressLineColor: getColor('green.500'),
  textActiveColor: getColor('charcoal.500'),
  textInactiveColor: getColor('charcoal.200'),
  spacingOffset: '45px',
  circleTransition: '100ms ease',
  transition: '200ms ease',
}

export const StepperUI = styled('div')`
  position: relative;
  margin: 0 auto;
`

export const StepWrapperUI = styled('div')`
  display: flex;
`

export const StepUI = styled('div')`
  color: ${config.textInactiveColor};
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-left: ${config.spacingOffset};
  padding-right: ${config.spacingOffset};
  padding-bottom: calc(12px + ${config.circleSize});
  position: relative;
  text-align: center;

  &.is-clickable {
    cursor: pointer;
  }

  &.is-active {
    color: ${config.textActiveColor};
    font-weight: 500;
  }

  &:first-of-type {
    .c-StepperStepLine,
    .c-StepperStepProgress {
      left: 50%;
    }
  }

  &:last-of-type {
    .c-StepperStepLine,
    .c-StepperStepProgress {
      right: 50%;
    }

    .c-StepperStepProgress {
      width: 50%;
    }
  }
`

export const GhostTitleUI = styled(Text)`
  display: block;
  font-weight: 500;
  height: 0;
  visibility: hidden;
`

export const CircleUI = styled('div')`
  background: ${config.backgroundColor};
  box-shadow: 0 0 0 3px ${config.backgroundColor};
  border: 3px solid currentColor;
  border-radius: 50%;
  color: ${config.inactiveColor};
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: calc(${config.circleSize} / 2 * -1);
  height: ${config.circleSize};
  width: ${config.circleSize};
  transform: translateZ(0);
  transition: all ${config.circleTransition};
  will-change: box-shadow, border;
  z-index: 1;

  ${({ isActive }) =>
    isActive &&
    `
    box-shadow: 0 0 0 0;
    color: ${config.activeColor};
  `};
`

export const LineUI = styled('div')`
  background: ${config.lineColor};
  bottom: 6px;
  left: 0;
  position: absolute;
  right: 0;
  height: ${config.lineHeight};
`
LineUI.defaultProps = {
  className: 'c-StepperStepLine',
}

export const ProgressLineUI = styled(LineUI)`
  background: ${config.progressLineColor};
  transition: transform ${config.transition};
  transform: scaleX(0);
  transform-origin: left;
  width: 100%;
  will-change: transform;

  &.is-active {
    transform: scaleX(1.1);
  }
`
