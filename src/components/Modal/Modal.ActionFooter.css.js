import styled from 'styled-components'
import Button from '../Button'
import Toolbar from '../Toolbar'
import { getColor } from '@hsds/utils-color'

export const ActionFooterUI = styled(Toolbar)`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #748494;

  &.is-theme-default {
    background-color: #f7f9fc;
    height: 80px;
    padding: 20px 30px;

    &.is-danger {
      background-color: ${getColor('grey', 200)};
    }

    &.is-alert {
      background-color: white;
      justify-content: center;
      margin: auto;
      border: none;
      min-height: 40px;
    }
  }
`

export const CancelButtonUI = styled(Button)`
  margin-right: auto;

  &.is-theme-grey {
    --buttonFontWeight: normal;
  }
`

export const SecondaryButtonUI = styled(Button)`
  margin-left: auto !important;
`

export const SecondaryAlertButtonUI = styled(Button)`
  margin-left: 0px !important;
`

export const PrimaryButtonUI = styled(Button)`
  margin-left: 10px;
`

export default ActionFooterUI
