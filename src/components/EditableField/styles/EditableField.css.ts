import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const EditableFieldUI = styled('div')`
  ${baseStyles};
  position: relative;
  margin-bottom: 20px;
`

export const EditableFieldLabelUI = styled('label')`
  ${baseStyles};
`

export const LabelTextUI = styled('span')`
  ${baseStyles};
  display: block;
  margin-bottom: 5px;
  color: ${getColor('grey.800')};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.7px;
  text-transform: uppercase;
`

export const AddButtonUI = styled('button')`
  display: block;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 10px 0 0 0;
  border: none;
  color: #c6d0d8;
  background-color: #f6f7f8;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    color: white;
    background-color: ${getColor('blue.500')};
  }

  &:focus {
    outline: 0;
    color: white;
    background-color: ${getColor('blue.500')};
    box-shadow: 0 0 0 1px white, 0 0 0 3px ${getColor('blue.400')};

    transform: translateZ(0);
  }

  .c-Icon {
    margin: 0 auto;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`
