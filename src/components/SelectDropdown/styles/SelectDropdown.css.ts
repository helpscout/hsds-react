import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import Backdrop from '../../Input/Input.BackdropV2'

export const SelectDropdownUI = styled('div')`
  .c-DropdownV2Trigger {
    display: block;
  }
`

export const InputUI = styled('div')`
  align-items: center;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  display: flex;
  height: 40px;
  padding-bottom: 1px;
  padding-top: 1px;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-decoration: none;

  &.is-editableField {
    ${baseStyles};
    height: 25px;
    padding: 0;
  }

  &:hover {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  &.is-sm {
    height: 32px;
  }

  &.is-error {
    padding-right: 40px;
  }
`

export const LabelUI = styled('div')`
  --BlueConfigGlobalFontSize: 14px;
  font-size: 14px;
  color: #2a3b47;
  padding-right: 20px;
  position: relative;
  text-decoration: none !important;
  z-index: 2;

  .is-editableField & {
    ${baseStyles};
    height: 25px;
    padding-right: 10px;
  }

  * {
    text-decoration: none !important;
  }
`

export const BackdropUI = styled(Backdrop)`
  border-color: #c1cbd4;

  &:not(.is-error) {
    border-left: 1px solid #c1cbd4 !important;
  }
`

export const SelectArrowDownUI = styled('div')`
  position: absolute;
  right: 0;
  color: #3c5263;
`

export const ErrorUI = styled('div')`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`
