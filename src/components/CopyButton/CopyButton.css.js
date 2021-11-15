import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'
import Icon from '../Icon'

export const config = {
  copyConfirmed: {
    background: getColor('blue.500'),
    color: 'white',
  },
}

export const TextUI = styled.span`
  display: inline-flex;
  transition: opacity linear 150ms;
`
export const IconUI = styled(Icon)`
  display: inline-flex;
  transition: opacity linear 150ms;
`

export const ConfirmationIconWrapperUI = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
  transition: opacity linear 150ms;
  color: white;
  background: ${config.copyConfirmed.background} !important;
`

export const CopyButtonUI = styled(Button)`
  position: relative;

  &.c-CopyButton {
    min-width: 60px;

    &.is-with-icon {
      min-width: auto;
      max-width: auto;
      width: 40px;
      padding: 0;
      text-align: center;
      background: ${getColor('grey.200')};
      color: ${getColor('charcoal.300')};

      &:hover {
        background: ${getColor('blue.100')};
      }
    }
  }

  &.is-copyConfirmed {
    border-color: ${config.copyConfirmed.background} !important;
    ${TextUI} {
      opacity: 0;
    }
    ${IconUI} {
      opacity: 0;
    }
    ${ConfirmationIconWrapperUI} {
      opacity: 1;
    }
  }
`
