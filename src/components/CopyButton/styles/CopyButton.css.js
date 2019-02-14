// @flow
import { getColor } from '../../../styles/utilities/color'
import styled from '../../styled'
import Button from '../../Button'

export const config = {
  copyConfirmed: {
    background: getColor('blue.500'),
    color: 'white',
  },
  iconTransitionDuration: '200ms',
  transition: 'background 200ms linear',
}

export const CopyButtonUI = styled(Button)`
  position: relative;
  transition: ${config.transition};

  &.is-iconOnly {
    padding-left: 9px !important;
    padding-right: 9px !important;

    &.is-lg {
      min-width: initial;
    }
  }

  &.is-copyConfirmed {
    background: ${config.copyConfirmed.background} !important;
    border-color: ${config.copyConfirmed.background} !important;
    color: ${config.copyConfirmed.color} !important;
  }
`

export const WrapperUI = styled('span')`
  display: block;

  &.is-animatable {
    transition: all ${config.iconTransitionDuration} linear;
  }
`

export const ContentWrapperUI = styled(WrapperUI)`
  opacity: 1;
  transform: scale(1);

  &.is-copyConfirmed {
    opacity: 0;
    transform: scale(0);
  }
`

export const ConfirmationIconWrapperUI = styled(WrapperUI)`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  opacity: 0;
  transform: scale(2);

  &.is-copyConfirmed {
    opacity: 1;
    transform: scale(1);
  }
`
