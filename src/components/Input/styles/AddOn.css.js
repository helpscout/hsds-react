// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import styled from '../../styled/index.ts'

export const config = {
  backgroundColor: getColor('grey.200'),
  borderColor: getColor('grey.600'),
  borderRadius: 4,
}

export const AddOnUI = styled('div')`
  ${baseStyles}
  background-color: ${config.backgroundColor};
  border: 1px solid ${config.borderColor};
  align-items: center;
  background-color: _color(grey, 200);
  border-radius ${config.borderRadius}px;
  display: flex;
  height: 100%;
  margin: 0;
  padding: 10px;

  &.is-first {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.is-last {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.is-notOnly {
    border-radius: 0;
  }
`

export default AddOnUI
