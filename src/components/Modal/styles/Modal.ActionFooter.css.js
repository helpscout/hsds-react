import Button from '../../Button'
import Toolbar from '../../Toolbar'
import styled from '../../styled'
import { getColor, rgba } from '../../../styles/utilities/color'

export const ActionFooterUI = styled(Toolbar)`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #748494;

  &.is-theme-default {
    background-color: #f7f9fc;
    height: 79px;
    padding: 20px 30px;

    &.is-danger {
      background-color: ${getColor('grey', 200)};
    }

    &.is-alert {
      padding: 0px;
      height: auto;
      background-color: white;
      justify-content: center;
      margin-bottom: 30px;
      border: none;
    }
  }
`

export const CancelButtonUI = styled(Button)`
  margin-right: auto;
`

export const SecondaryButtonUI = styled(Button)`
  margin-left: auto;
`

export const PrimaryButtonUI = styled(Button)`
  margin-left: 10px;
`

export default ActionFooterUI
