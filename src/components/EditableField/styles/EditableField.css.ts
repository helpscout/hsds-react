import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'
import {
  COLOURS,
  SIZES,
  ACTIONS_CLASSNAMES,
  MASK_CLASSNAMES,
  STATES_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
} from '../EditableField.utils'

const { field, fieldLabel } = SIZES

export const ComponentUI = styled('div')`
  ${baseStyles};
  position: relative;
  margin-bottom: 40px;
`

export const EditableFieldLabelUI = styled('label')`
  ${baseStyles};
`

export const LabelTextUI = styled('span')`
  ${baseStyles};
  display: block;
  margin-bottom: 5px;
  color: ${getColor('grey.800')};
  font-size: ${fieldLabel.font.medium};
  font-weight: 500;
  letter-spacing: 0.7px;
  text-transform: uppercase;
`

export const FieldUI = styled('div')`
  ${baseStyles};
  position: relative;
  height: ${field.height};
  margin-bottom: 2px;
  width: auto;
  transition: width 0.2s ease-in-out;

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
  }

  &:hover .${ACTIONS_CLASSNAMES.actions} {
    opacity: 1;
  }

  &:hover .${MASK_CLASSNAMES.option}, &:hover .${MASK_CLASSNAMES.value} {
    border-bottom: 1px dashed ${COLOURS.mask.border};
  }

  &:hover .${MASK_CLASSNAMES.value} {
    width: 100%;
  }

  &.is-empty:hover .${MASK_CLASSNAMES.value} {
    width: auto;
  }

  &.is-active:hover .${ACTIONS_CLASSNAMES.actions} {
    display: none;
    cursor: initial;
  }

  &:hover .${STATES_CLASSNAMES.withPlaceholder} {
    border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.hover};
  }

  .${STATES_CLASSNAMES.fieldDisabled}
    &:hover
    .${MASK_CLASSNAMES.option},
    .${STATES_CLASSNAMES.fieldDisabled}
    &:hover
    .${MASK_CLASSNAMES.value} {
    border-bottom: 1px solid ${COLOURS.invisible};
  }

  .is-temporary-value {
    position: absolute;
    left: -99999px;
    font-size: ${field.font.medium};
    visibility: hidden;
    width: auto;
    height: auto;
  }
`

export const AddButtonUI = styled('button')`
  display: block;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 8px 0 0 0;
  border: none;
  color: ${getColor('grey.800')};
  background-color: ${getColor('grey.300')};
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

  &:disabled {
    cursor: default;
    color: #c6d0d8;
    background-color: ${getColor('grey.300')};
  }

  .${OTHERCOMPONENTS_CLASSNAMES.icon} {
    position: relative;
    left: -2px;
    top: -2px;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`
