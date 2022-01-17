import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'
import Icon from '../Icon'

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
  background: var(--confirmColor);
`

export const CopyButtonUI = styled(Button)`
  --confirmColor: var(--buttonMainColor);
  --confirmBorderColor: var(buttonBorderColor);
  position: relative;

  &.is-copyConfirmed {
    border-color: var(--confirmColor) !important;
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
