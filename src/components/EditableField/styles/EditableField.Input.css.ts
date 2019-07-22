import styled from '../../styled/index'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

const CONTENT_HEIGHT = 25

export const EditableFieldInputUI = styled('div')`
  ${baseStyles};
  position: relative;
  height: ${CONTENT_HEIGHT}px;
  margin-bottom: 2px;
  width: ${({ dynamicFieldWidth, renderAsBlock }) =>
    renderAsBlock ? 'auto' : `${dynamicFieldWidth}`};
  transition: width 0.2s ease-in-out;

  &:hover .EditableField__actions {
    opacity: 1;
  }

  &:hover .EditableField__staticOption,
  &:hover .EditableField__staticValue {
    border-bottom: 1px dashed ${getColor('charcoal.200')};
  }

  &.is-active:hover .EditableField__actions {
    display: none;
    cursor: initial;
  }

  &:hover .with-placeholder {
    border-bottom: 1px dashed ${getColor('blue.500')};
  }

  .is-disabled &:hover .with-placeholder {
    border-bottom: 1px solid transparent;
  }

  .is-temporary-value {
    position: absolute;
    left: -99999px;
    font-size: 14px;
    visibility: hidden;
    width: auto;
    height: auto;
  }
`

export const InteractiveContentUI = styled('div')`
  display: flex;
  height: ${CONTENT_HEIGHT}px;
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-bottom: 1px solid transparent;

  .is-disabled &:hover {
    cursor: initial;
    border-bottom: 1px solid transparent;
  }

  .is-active & {
    pointer-events: none;
    z-index: 2;
    border-bottom-color: transparent !important;
  }
`

export const InputWrapperUI = styled('div')`
  position: relative;
  height: ${CONTENT_HEIGHT - 2}px;
  width: 100%;

  .has-options & {
    width: calc(100% - 70px);
  }

  .is-empty & {
    width: 100%;
  }
`

export const OptionsWrapperUI = styled('div')`
  position: relative;
  width: 60px;
  height: ${CONTENT_HEIGHT}px;
  margin-right: 20px;
  font-size: 14px;
  pointer-events: auto;

  .is-disabled & .EditableField__Dropdown:hover {
    cursor: initial;
  }

  .is-empty & {
    width: 0;
    margin-right: 0;
  }

  .is-active.is-empty & {
    width: 60px;
    margin-right: 20px;
  }

  .c-DropdownV2Trigger:hover {
    cursor: text;
  }
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
  line-height: ${CONTENT_HEIGHT}px;
  height: ${CONTENT_HEIGHT - 2}px;
  color: transparent;

  .is-active & {
    color: black;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      height: 1px;
      background-color: #c6d0d8;
    }
  }

  .is-active .c-DropdownV2Trigger:focus & {
    outline: none;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      background-color: ${getColor('blue.500')};
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
  height: ${CONTENT_HEIGHT}px;
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
      background-color: ${getColor('blue.500')} !important;
      height: 2px;
    }
  }

  .is-active & {
    outline: none;
    color: ${getColor('charcoal.600')};
    z-index: 2;
    cursor: initial;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      height: 1px;
      background-color: #c6d0d8;
    }

    &::placeholder {
      color: ${getColor('charcoal.300')};
      opacity: 1;
    }
  }

  .is-empty & {
    cursor: pointer;
  }

  .is-disabled & {
    cursor: initial;
  }

  .is-empty &:focus {
    cursor: initial;
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
  width: ${({ staticContentWidth, renderAsBlock }) =>
    renderAsBlock ? '100%' : `${staticContentWidth}`};
  max-width: 100%;
  height: ${CONTENT_HEIGHT}px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  .is-active & {
    z-index: 1;
  }
`

export const StaticOptionUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  position: relative;
  width: 70px;
  height: ${CONTENT_HEIGHT - 2}px;
  margin-right: 10px;
  color: ${getColor('charcoal.600')};
  font-size: 14px;
  font-weight: 500;
  line-height: ${CONTENT_HEIGHT}px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid transparent;

  .is-empty & {
    display: none;
  }

  .is-active & {
    z-index: 1;
    display: inline-block;
  }

  & .is-placeholder {
    color: ${getColor('charcoal.300')};
  }

  .is-disabled & {
    color: ${getColor('charcoal.200')};
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed #93a1b0;
  }
`

export const StaticValueUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  height: ${CONTENT_HEIGHT - 2}px;
  line-height: ${CONTENT_HEIGHT}px;
  width: 100%;
  max-width: 100%;
  color: ${getColor('charcoal.800')};
  font-size: 14px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid transparent;

  .has-options & {
    width: calc(100% - 80px);
  }

  .has-options.is-empty & {
    width: auto;
  }

  .is-active & {
    z-index: 1;
    border-bottom: none !important;
  }

  &.is-emphasized {
    font-weight: 500;
  }

  &.with-placeholder {
    width: auto;
    border-bottom: 1px dashed ${getColor('grey.800')};
  }

  & .is-placeholder {
    color: ${getColor('charcoal.300')};
  }

  .is-disabled &.with-placeholder {
    border-bottom: 1px solid transparent;
  }

  .is-disabled & {
    color: ${getColor('charcoal.300')};
  }

  .is-disabled & .is-placeholder {
    color: ${getColor('charcoal.200')};
  }

  &:focus {
    outline: 0;
    border-bottom: 1px dashed rgba(197, 208, 217, 0.5);
  }
`

export const FocusIndicatorUI = styled('span')`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${getColor('blue.500')};
  transform-origin: bottom left;
  transform: scaleX(0);
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 3;
`

export const FieldActionsUI = styled('div')`
  ${({ numberOfActions }) => `width: ${numberOfActions * 25 + 5}px;`}
  height: ${CONTENT_HEIGHT}px;
  position: absolute;
  top: 1px;
  left: ${({ renderAsBlock, numberOfActions }) =>
    renderAsBlock ? `calc(100% - ${numberOfActions * 25 + 5}px)` : '100%'};
  z-index: 4;
  opacity: 0;
  text-align: right;

  &:hover {
    opacity: 1;
  }
`

export const FieldButtonUI = styled('button')`
  display: inline-block;
  vertical-align: middle;
  height: ${CONTENT_HEIGHT}px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: slategray;
  font-size: 12px;
  text-align: center;
  overflow: hidden;

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
    width: 24px;
    transform: translateX(3px);
  }
`
