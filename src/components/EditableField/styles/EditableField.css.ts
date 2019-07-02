import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'

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
  font-size: 13px;
  color: #a2b2be;
`

export const AddButtonUI = styled('button')`
  display: block;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  color: #c6d0d8;
  background-color: #f6f7f8;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    color: white;
    background-color: #1292ee;
  }

  .c-Icon {
    margin: 0 auto;
  }
`
