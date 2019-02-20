import styled from '../styled'
import { getColor, rgba } from '../../styles/utilities/color'

import baseStyles from '../../styles/resets/baseStyles.css'
import Button from '../Button'
import Dropdown from '../Dropdown/DropdownV2'

export const ButtonUI = styled(Button)`
  border-radius: 0;
  vertical-align: top;
`

export const ButtonWrapperUI = styled('div')`
  ${baseStyles};
  background-color: ${getColor('blue.500')};
  border-radius: 3px;
  overflow: hidden;
`

export const OptionsTriggerButtonUI = styled(Button)`
  border-radius: 0;
  min-width: 30px !important;
  padding: 0 !important;

  .c-ButtonV2__content {
    padding-top: 2px;
    width: 16px !important;
  }
`

export const OptionsDropdownUI = styled(Dropdown)`
  display: inline-block;
`

export const VerticalDividerUI = styled('div')`
  ${props =>
    !props.disabled &&
    `
    border-left: 1px solid ${rgba('#fff', 0.3)};
  `} display: inline-block;
  height: 40px;
  vertical-align: top;
`
