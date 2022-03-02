import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

export const VerificationCodeFieldUI = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  height: 74px;
  border: 1px solid #c5ced6;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 0 0 0 ${rgba(getColor('border'), 0)};
  transition: box-shadow 100ms ease, border-color 100ms ease;

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  &:focus {
    outline: none;
  }

  &:focus-within {
    border-color: transparent;
    box-shadow: 0 0 0 2px ${getColor('blue.500')};
  }

  &.not-valid {
    border-color: transparent;
    box-shadow: 0 0 0 2px #f23459;
  }
`

export const DigitInputWrapperUI = styled('div')`
  position: relative;
  margin: 0 15px 0 0;

  &:last-of-type {
    margin-right: 0;
  }
`

export const DigitMaskUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 50px;
  padding: 0 0 7px 0;
  font-family: var(--HSDSGlobalFontFamilySystem);
  font-size: 35px;
  line-height: 41px;
  text-align: center;
  color: ${getColor('charcoal.700')};
  border-bottom: 2px solid #d5dce1;
  -webkit-font-smoothing: antialiased;

  &::selection {
    background-color: #b2d7ff;
  }

  &.hidden {
    opacity: 0;
  }
`

export const DigitInputUI = styled('input')`
  position: relative;
  width: 40px;
  height: 50px;
  padding: 0 0 7px 0;
  margin: 0;
  border: 0;
  border-bottom: 2px solid #d5dce1;
  font-family: var(--HSDSGlobalFontFamilySystem);
  font-size: 35px;
  line-height: 35px;
  text-align: center;
  color: ${getColor('charcoal.700')};
  transition: border-color 200ms ease;
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
    border-bottom-color: ${getColor('blue.500')};
  }

  &::selection {
    background-color: #b2d7ff;
  }

  &.hidden {
    opacity: 0;
  }
`

export const ClipboardPlaceholderUI = styled('textarea')`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  width: 1px;
  height: 1px;
  overflow: hidden;
`

export const ValidIconUI = styled(Tooltip)`
  position: absolute;
  right: 8px;
  top: calc(50% - 24px / 2);
`

export const IconUI = styled(Icon)`
  color: #f23459;
`
