import styled from '../styled'
import { getColor } from '../../styles/utilities/color'

export const VerificationCodeFieldUI = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 72px;
  border: 1px solid #c5ced6;
  border-radius: 3px;
  background-color: #fff;

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  div:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: none;
  }

  &:focus-within {
    border: 2px solid ${getColor('blue.500')};
  }
`

export const DigitInputUI = styled('div')`
  position: relative;
  margin: 0 15px 0 0;
`

export const DigitMaskUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 35px;
  padding: 0 0 5px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 35px;
  line-height: 27px;
  text-align: center;
  color: ${getColor('charcoal.700')};
  border-bottom: 2px solid #d5dce1;

  &::selection {
    background-color: #b2d7ff;
  }
`

export const InputUI = styled('input')`
  position: relative;
  width: 40px;
  height: 35px;
  padding: 0 0 5px 0;
  margin: 0;
  border: 0;
  border-bottom: 2px solid #d5dce1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 35px;
  line-height: 35px;
  text-align: center;
  color: ${getColor('charcoal.700')};

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
