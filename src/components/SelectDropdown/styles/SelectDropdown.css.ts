import Backdrop from '../../Input/Input.BackdropV2'
import styled from 'styled-components'

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
  --HSDSGlobalFontSize: 14px;
  font-size: 14px;
  color: #2a3b47;
  max-width: 100%;
  padding-right: 20px;
  position: relative;
  text-decoration: none !important;
  z-index: 2;

  * {
    text-decoration: none !important;
  }
`

export const ArrowsUI = styled('div')`
  background: blue;
  height: 40px;
  width: 40px;

  &.is-error {
    background: red;
    right: 40px !important;
  }
`

export const BackdropUI = styled(Backdrop)`
  border-color: #c1cbd4;

  &:not(.is-error) {
    border-left: 1px solid #c1cbd4 !important;
  }
`

export const ErrorUI = styled('div')`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`
