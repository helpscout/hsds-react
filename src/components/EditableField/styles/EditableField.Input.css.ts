import styled from '../../styled/index'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const EditableFieldInputUI = styled('div')`
  ${baseStyles};
  position: relative;
  height: 25px;
  margin-bottom: 10px;

  &:hover .EditableField__actions {
    opacity: 1;
    cursor: pointer;
  }

  &.is-active:hover .EditableField__actions {
    display: none;
    cursor: initial;
  }
`

export const InteractiveContentUI = styled('div')`
  display: flex;
  height: 26px;
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-bottom: 1px solid transparent;

  &:hover {
    cursor: pointer;
    border-bottom: 1px dashed #c6d0d8;
  }

  .is-active & {
    pointer-events: none;
    z-index: 2;
    border-bottom-color: transparent !important;
  }
`

export const InputWrapperUI = styled('div')`
  position: relative;
  height: 25px;
  width: 100%;

  .has-options & {
    width: calc(100% - 70px);
  }
`

export const OptionsWrapperUI = styled('div')`
  position: relative;
  width: 60px;
  height: 25px;
  margin-right: 20px;
  font-size: 14px;
  line-height: 25px;
  pointer-events: auto;
`

export const TriggerUI = styled('div')`
  position: relative;
  width: 100%;
`

export const OptionsDropdownUI = styled('div')`
  width: 70px;
  margin-bottom: 5px;
  background: white;
  font-size: 14px;
  line-height: 25px;
  color: transparent;

  .is-active & {
    color: black;

    & + .EditableField__focusIndicator {
      bottom: 0;
      transform: scaleX(1);
      height: 1px;
      background-color: #c6d0d8;
    }
  }

  .is-active .c-DropdownV2Trigger:focus & {
    outline: none;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      background-color: #1292ee;
      height: 2px;
    }
  }

  &:focus {
    & + .EditableField__focusIndicator {
      transform: scaleX(1);
    }
  }

  & .c-Icon {
    position: absolute;
    right: -5px;
    top: 5px;
  }

  & .c-Truncate {
    width: 60px;
  }
`

export const InputUI = styled('input')`
  width: 100%;
  height: 25px;
  padding: 0;
  border: none;
  color: transparent;
  font-size: 14px;
  background: white;
  pointer-events: auto;

  &::placeholder {
    color: transparent;
  }

  .is-active &:focus {
    outline: none;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      background-color: #1292ee;
      height: 2px;
    }
  }

  .is-active & {
    outline: none;
    color: black;
    z-index: 2;
    cursor: initial;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      bottom: 0;
      height: 1px;
      background-color: #c6d0d8;
    }

    &::placeholder {
      color: #b7c2cc;
    }
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export const StaticContentUI = styled('div')`
  position: relative;
  display: inline-block;
  max-width: 100%;
  height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  .is-active & {
    z-index: 1;
  }
`

export const StaticOptionUI = styled('span')`
  display: inline-block;
  vertical-align: baseline;
  width: 70px;
  height: 25px;
  margin-right: 10px;
  color: #3c5263;
  font-size: 14px;
  line-height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  .is-empty & {
    display: none;
  }

  .is-active & {
    z-index: 1;
    display: inline-block;
  }

  & .is-placeholder {
    color: #b7c2cc;
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed #c6d0d8;
  }
`

export const StaticValueUI = styled('span')`
  display: inline-block;
  vertical-align: baseline;
  height: 25px;
  width: 100%;
  max-width: 100%;
  color: #3c5263;
  font-size: 14px;
  line-height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  .has-options & {
    width: calc(100% - 80px);
  }

  .is-active & {
    z-index: 1;
  }

  & .is-placeholder {
    color: #b7c2cc;
  }

  &:focus {
    outline: none;
    outline: 1px dashed rgba(197, 208, 217, 0.5);
  }
`

export const FocusIndicatorUI = styled('span')`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #1292ee;
  transform-origin: bottom left;
  transform: scaleX(0);
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 3;
`

export const FieldActionsUI = styled('div')`
  ${({ numberOfActions }) => `width: ${numberOfActions * 25}px;`}
  height: 20px;
  position: absolute;
  top: 1px;
  left: 100%;
  z-index: 4;
  opacity: 0;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

export const FieldButtonUI = styled('button')`
  display: inline-block;
  vertical-align: middle;
  height: 25px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: slategray;
  font-size: 12px;
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

  .c-Icon {
    margin: 0 auto;
  }
`
