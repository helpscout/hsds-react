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
  font-size: 13px;
  color: #a2b2be;
`

export const FieldContentUI = styled('div')`
  ${baseStyles};
  position: relative;
  height: 25px;
  margin-bottom: 10px;

  &:hover .c-EditableField__actions {
    display: block;
    cursor: pointer;
  }

  &.is-editing:hover .c-EditableField__actions {
    display: none;
    cursor: initial;
  }
`

export const FieldInputUI = styled('input')`
  ${baseStyles};
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  border: none;
  border-bottom: 1px solid transparent;
  height: 25px;
  line-height: 27px;
  padding: 3px 0px;
  color: transparent;
  background-color: #fff;
  font-family: sans-serif;
  font-size: 15px;
  z-index: 1;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    cursor: pointer;
    border-bottom: 1px dashed #c6d0d8;
  }

  &:focus {
    outline: none;
  }

  .is-editing & {
    border-bottom: 1px solid transparent !important;
    outline: none;
    color: black;
    z-index: 2;
    cursor: initial;

    &::placeholder {
      color: #b7c2cc;
    }
  }
`
export const FieldStaticValueUI = styled('span')`
  ${baseStyles};
  position: relative;
  display: inline-block;
  max-width: 100%;
  height: 25px;
  padding: 0px 0px 6px;
  color: #3c5263;
  font-size: 15px;
  font-family: sans-serif;
  line-height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  .is-editing & {
    z-index: 1;
  }

  & .is-placeholder {
    color: #b7c2cc;
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed #c6d0d8;
  }
`

export const FocusIndicatorUI = styled('span')`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #1292ee;
  transform-origin: bottom left;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  z-index: 3;

  .is-editing & {
    transform: scaleX(1);
  }
`

export const FieldActionsUI = styled('div')`
  ${baseStyles};
  ${({ numberOfActions }) => `width: ${numberOfActions * 25}px;`}
  height: 20px;
  padding-left: 5px;
  position: absolute;
  top: 3px;
  left: 100%;
  z-index: 4;
  display: none;
`

export const FieldButtonUI = styled('button')`
  ${baseStyles};
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: slategray;
  font-size: 12px;
  font-family: monospace;
  text-align: center;

  &:hover,
  &:focus {
    cursor: pointer;
    color: #3c5263;
  }

  &:focus {
    outline: none;
  }

  &.action-delete {
    &:focus,
    &:hover {
      color: ${getColor('red.500')};
    }
  }
`

export const AddButtonUI = styled('button')`
  display: block;
  height: 22px;
  width: 22px;
  padding: 0;
  margin: 0;
  border: none;
  color: #c6d0d8;
  background-color: #f6f7f8;
  cursor: pointer;
`
