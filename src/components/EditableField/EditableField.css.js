import styled from 'styled-components'

import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY } from '../../styles/configs/constants'

import {
  COLOURS,
  SIZES,
  ACTIONS_CLASSNAMES,
  EDITABLEFIELD_CLASSNAMES,
  INPUT_CLASSNAMES,
  MASK_CLASSNAMES,
  STATES_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
  TRUNCATED_CLASSNAMES,
} from './EditableField.utils'

import { DropListWrapperUI } from '../DropList/DropList.css'

const {
  field,
  fieldLabel,
  floatingLabel,
  focusIndicator,
  input,
  mask,
  compositeMask,
} = SIZES

export const EditableFieldUI = styled('div')`
  position: relative;
  margin-bottom: 40px;
`

export const LabelTextUI = styled('span')`
  display: block;
  margin-bottom: 5px;
  color: ${getColor('grey.800')};
  font-size: ${fieldLabel.font.medium};
  font-weight: 500;
  letter-spacing: 0.7px;
  text-transform: uppercase;
`

export const FieldUI = styled('div')`
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

  
  /* prettier-ignore */
  &.${STATES_CLASSNAMES.fieldDisabled + ':hover'},
  .${STATES_CLASSNAMES.fieldDisabled} &:hover {
    .${MASK_CLASSNAMES.option},
    .${MASK_CLASSNAMES.value} {
    border-bottom: 1px solid ${COLOURS.invisible};
    }
  }

  .is-temporary-value {
    position: absolute;
    left: -99999px;
    font-size: ${field.font.medium};
    visibility: hidden;
    width: auto;
    height: auto;
  }

  ${DropListWrapperUI} {
    width: auto;
    max-width: 200px;
    min-width: 75;
  }
`

export const AddButtonUI = styled('button')`
  display: block;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 9px 0 0 0;
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
    box-shadow: 0 0 0 1px white, 0 0 0 3px ${getColor('blue.500')};
    transform: translateZ(0);
  }

  &:disabled {
    cursor: not-allowed;
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

/**
 * ========================================
 * INPUT
 * ========================================
 */

const resetHSAppInputRules = `
border-radius: 0;
display: block;
margin: 0;
vertical-align: baseline;
border: none;
transition: none;

&:focus {
  border: none;
  outline: 0;
}
`

export const EditableFieldInputUI = styled('div')`
  display: flex;
  height: ${field.height.medium};
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-bottom: 1px solid ${COLOURS.invisible};

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
  }

  .${STATES_CLASSNAMES.fieldDisabled} &:hover {
    cursor: initial;
    border-bottom: 1px solid ${COLOURS.invisible};
  }

  .${STATES_CLASSNAMES.isActive} & {
    pointer-events: none;
    z-index: 2;
    border-bottom-color: ${COLOURS.invisible} !important;
  }

  &.${STATES_CLASSNAMES.isInline} {
    position: relative;
  }
`

export const InputWrapperUI = styled('div')`
  position: relative;
  height: ${input.height.medium};
  width: 100%;

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
  }

  .${STATES_CLASSNAMES.hasOptions} & {
    width: calc(100% - 70px);
  }

  .${STATES_CLASSNAMES.isEmpty} & {
    width: 100%;
  }

  &::before {
    opacity: 0;
    will-change: transform, font-size;
    transition-property: transform, font-size;
    transition-timing-function: linear;
    transition-duration: 0.2s;
    pointer-events: none;
  }

  .${STATES_CLASSNAMES.withFloatingLabels} &,
  .${STATES_CLASSNAMES.hasActiveFields} & {
    &::before {
      content: ${({ withPlaceholder }) => `"${withPlaceholder}"`};
      opacity: ${({ value }) => `${value ? '1' : '0'}`};
      transform: ${({ value }) => `translateY(${value ? -15 : -10}px)`};
      transform-origin: center left;
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      height: ${field.height.medium};
      line-height: ${field.lineHeight.medium};
      font-family: ${FONT_FAMILY};
      font-size: ${({ value }) =>
        `${value ? floatingLabel.font.medium : field.font.medium}`};
      color: ${COLOURS.input.placeholder};
    }
  }
`

export const InputUI = styled('input')`
  /* Guard styles from other globally applied rules for input tags */
  &.${INPUT_CLASSNAMES.input} {
    ${resetHSAppInputRules}
    width: 100%;
    height: ${field.height.medium};
    line-height: ${field.height.medium};
    padding: 0;
    border: none;
    color: ${COLOURS.invisible};
    font-family: ${FONT_FAMILY};
    font-size: ${field.font.medium};
    background: white;
    pointer-events: auto;

    .${STATES_CLASSNAMES.isLarge} & {
      height: ${field.height.large};
      line-height: ${field.height.large};
      font-size: ${field.font.large};
    }

    .${STATES_CLASSNAMES.isActive} & {
      outline: none;
      color: ${COLOURS.input.regular};
      z-index: 2;
      cursor: initial;

      & + .${INPUT_CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        height: ${focusIndicator.inactive};
        background-color: ${COLOURS.focusIndicator.inactive};
      }

      &::placeholder {
        color: ${COLOURS.input.placeholder};
        opacity: 1;
      }
    }

    .${STATES_CLASSNAMES.isActive} &:focus {
      outline: none;

      & + .${INPUT_CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        background-color: ${COLOURS.focusIndicator.active};
        height: ${focusIndicator.active};
      }
    }

    .${STATES_CLASSNAMES.isEmpty} & {
      cursor: pointer;
    }

    .${STATES_CLASSNAMES.fieldDisabled} & {
      cursor: not-allowed;
      pointer-events: none;
      display: none;
      color: ${COLOURS.input.placeholder};
    }

    .${STATES_CLASSNAMES.isEmpty} &:focus {
      cursor: initial;
    }

    .${STATES_CLASSNAMES.hasActiveFields} & {
      color: ${COLOURS.input.regular};

      & + .${INPUT_CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        height: ${focusIndicator.inactive};
        background-color: ${COLOURS.focusIndicator.inactive};
      }

      &::placeholder {
        color: ${COLOURS.input.placeholder};
        opacity: 1;
      }
    }

    &::placeholder {
      color: ${COLOURS.invisible};
    }

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`

export const OptionsWrapperUI = styled('div')`
  position: relative;
  width: 60px;
  height: ${field.height.medium};
  margin-right: 20px;
  font-family: ${FONT_FAMILY};
  font-size: ${field.font.medium};
  pointer-events: auto;

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
  }

  .${STATES_CLASSNAMES.isEmpty} & {
    width: 0;
    margin-right: 0;
  }

  .${STATES_CLASSNAMES.isActive}.${STATES_CLASSNAMES.isEmpty} & {
    width: 60px;
    margin-right: 20px;
  }
`

export const TriggerUI = styled('button')`
  position: relative;
  width: 100%;
  min-width: 70px;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  text-align: left;
  height: ${input.height.medium};
  line-height: ${field.height.medium};
  cursor: pointer;

  .is-active &:focus {
    outline: 0;

    .${INPUT_CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
      background-color: ${COLOURS.focusIndicator.active};
      height: ${focusIndicator.active};
    }
  }
`

export const OptionsDropdownUI = styled('div')`
  width: 70px;
  height: ${input.height.medium};
  line-height: ${field.height.medium};
  margin-bottom: 5px;
  font-family: ${FONT_FAMILY};
  font-size: ${field.font.medium};
  color: ${COLOURS.invisible};
  background: white;

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
    line-height: ${field.height.large};
    font-size: ${field.font.large};
  }

  &:hover .${OTHERCOMPONENTS_CLASSNAMES.icon} {
    color: ${getColor('charcoal.200')};
  }

  .${STATES_CLASSNAMES.isActive} &:hover .${OTHERCOMPONENTS_CLASSNAMES.icon} {
    color: ${getColor('charcoal.800')};
  }

  .${STATES_CLASSNAMES.isActive} & {
    color: ${getColor('charcoal.800')};

    & + .${INPUT_CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
      height: ${focusIndicator.inactive};
      background-color: ${COLOURS.focusIndicator.inactive};
    }
  }

  &.menu-open + .${INPUT_CLASSNAMES.focusIndicator} {
    transform: scaleX(1);
    background-color: ${COLOURS.focusIndicator.active};
    height: ${focusIndicator.active};
  }

  & .${OTHERCOMPONENTS_CLASSNAMES.icon} {
    position: absolute;
    right: -5px;
    top: 3px;
  }

  & .${OTHERCOMPONENTS_CLASSNAMES.truncate} {
    width: 60px;
  }
`

export const FocusIndicatorUI = styled('span')`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: ${focusIndicator.active};
  background-color: ${({ color }) => color};
  transform-origin: bottom left;
  transform: scaleX(0);
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 3;
  will-change: transform, background-color;

  .${STATES_CLASSNAMES.withValidation} & {
    transform: scaleX(1);
  }
`

export const ValidationIconUI = styled('div')`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 0;
  right: 0;
  z-index: 10;
  pointer-events: all;

  .${OTHERCOMPONENTS_CLASSNAMES.icon} {
    color: ${({ color }) => color};
  }
`

/**
 * ========================================
 * MASK
 * ========================================
 */

export const EditableFieldMaskUI = styled('div')`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
  height: ${mask.height.medium};
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  font-family: ${FONT_FAMILY};

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
  }

  .${STATES_CLASSNAMES.isActive} & {
    z-index: 1;
  }

  &.${STATES_CLASSNAMES.fieldDisabled} {
    pointer-events: all;
  }
`

export const MaskOptionUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  position: relative;
  width: 70px;
  height: ${mask.height.medium};
  line-height: ${field.lineHeight.medium};
  margin-right: 10px;
  color: ${COLOURS.mask.regular};
  font-family: ${FONT_FAMILY};
  font-size: ${field.font.medium};
  font-weight: 500;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid ${COLOURS.invisible};

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
    line-height: ${field.height.large};
    font-size: ${field.font.large};
  }

  .${STATES_CLASSNAMES.isEmpty} & {
    display: none;
  }

  .${STATES_CLASSNAMES.isActive} & {
    z-index: 1;
    display: inline-block;
  }

  & .${STATES_CLASSNAMES.isPlaceholder} {
    color: ${COLOURS.mask.placeholder.regular};
  }

  .${STATES_CLASSNAMES.fieldDisabled} & {
    color: ${COLOURS.mask.disabled};
    pointer-events: all;
    cursor: default;
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed ${COLOURS.mask.focused};
  }

  .${OTHERCOMPONENTS_CLASSNAMES.truncate} {
    width: 60px;
  }
`

export const MaskValueUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  height: ${mask.height.medium};
  line-height: ${field.lineHeight.medium};
  width: 100%;
  max-width: 100%;
  color: ${COLOURS.mask.regular};
  font-family: ${FONT_FAMILY};
  font-size: ${field.font.medium};
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid ${COLOURS.invisible};

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${field.height.large};
    line-height: ${field.height.large};
    font-size: ${field.font.large};
  }

  .${EDITABLEFIELD_CLASSNAMES.field}.${STATES_CLASSNAMES.hasOptions} & {
    width: calc(100% - 80px);
  }

  .${STATES_CLASSNAMES.hasOptions}.${STATES_CLASSNAMES.isEmpty} & {
    width: auto;
  }

  .${STATES_CLASSNAMES.isActive} & {
    z-index: 1;
    border-bottom: none !important;
  }

  .${STATES_CLASSNAMES.withValidation} & {
    border-bottom: none !important;
  }

  &.${STATES_CLASSNAMES.isEmphasized} {
    font-weight: 500;
  }

  &.${STATES_CLASSNAMES.withPlaceholder} {
    width: auto;
    border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.regular};
  }

  & .${STATES_CLASSNAMES.isPlaceholder} {
    color: ${COLOURS.mask.placeholder.regular};
  }

  .${STATES_CLASSNAMES.fieldDisabled} &.${STATES_CLASSNAMES.withPlaceholder} {
    border-bottom: 1px solid ${COLOURS.invisible};
  }

  .${STATES_CLASSNAMES.fieldDisabled} & {
    color: ${COLOURS.mask.disabled};
  }

  .${STATES_CLASSNAMES.fieldDisabled} & .${STATES_CLASSNAMES.isPlaceholder} {
    color: ${COLOURS.mask.placeholder.disabled};
  }

  .${TRUNCATED_CLASSNAMES.component} {
    width: ${({ numberOfActions }) => `calc(100% - ${numberOfActions * 20}px)`};
  }

  &:focus {
    outline: 0;
    border-bottom: 1px dashed ${COLOURS.mask.focused};

    .${OTHERCOMPONENTS_CLASSNAMES.truncate} {
      width: 100%;
    }
  }
`

/**
 * ========================================
 * ACTIONS
 * ========================================
 */

export const EditableFieldActionsUI = styled('div')`
  ${({ numberOfActions }) => `width: ${numberOfActions * 25 + 5}px;`}
  height: 21px;
  position: absolute;
  top: 1px;
  left: ${({ numberOfActions }) =>
    `calc(100% - ${numberOfActions * 25 + 5}px)`};
  z-index: 4;
  opacity: 0;
  text-align: right;

  &:hover {
    opacity: 1;
  }

  .${STATES_CLASSNAMES.fieldDisabled} &,
  &.${STATES_CLASSNAMES.withValidation} {
    display: none;
  }
`

export const FieldButtonUI = styled('button')`
  &.${ACTIONS_CLASSNAMES.fieldButton} {
    display: inline-block;
    vertical-align: middle;
    height: 21px;
    width: 20px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: ${COLOURS.invisible};
    color: ${COLOURS.button.regular};
    font-size: 12px;
    text-align: center;
    overflow: hidden;

    &:hover,
    &:focus {
      cursor: pointer;
      color: ${COLOURS.button.hover};
    }

    &:focus {
      outline: none;
    }

    &.action-delete {
      &:focus,
      &:hover {
        color: ${COLOURS.button.delete};
      }
    }

    .${OTHERCOMPONENTS_CLASSNAMES.icon} {
      width: 24px;
      transform: translateX(3px);
    }
  }
`

/**
 * ========================================
 * TRUNCATED
 * ========================================
 */

export const TruncatedUI = styled('div')`
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  .${TRUNCATED_CLASSNAMES.firstChunk} {
    flex-shrink: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .${TRUNCATED_CLASSNAMES.secondChunk} {
    max-width: 90%;
    flex-shrink: 0;
  }
`

/**
 * ========================================
 * COMPOSITE
 * ========================================
 */

export const EditableFieldCompositeUI = styled('div')`
  display: flex;
  position: relative;

  .${EDITABLEFIELD_CLASSNAMES.component} {
    margin-right: 10px;
    margin-bottom: 0;

    &:last-child {
      margin-right: 0;
    }

    input {
      pointer-events: none;
    }
  }

  &.${STATES_CLASSNAMES.hasActiveFields} {
    .${EDITABLEFIELD_CLASSNAMES.component} {
      input {
        pointer-events: auto;
      }
    }
  }
`

export const ComposedMaskUI = styled('div')`
  position: absolute;
  display: flex;
  z-index: 3;
  width: auto;
  top: 0;
  left: 0;
  height: ${compositeMask.height.medium};
  line-height: ${compositeMask.lineHeight.medium};
  font-family: ${FONT_FAMILY};
  font-size: ${compositeMask.font.medium};

  span {
    display: inline-block;
    height: ${compositeMask.height.medium};
    line-height: ${compositeMask.lineHeight.medium};
  }

  &:hover {
    border-bottom: 1px dashed ${COLOURS.mask.border};
  }

  &:focus {
    outline: 0;
    border-bottom: 1px dashed ${COLOURS.mask.focused};
  }

  &.${STATES_CLASSNAMES.isHidden} {
    display: none;
  }

  & .is-placeholder {
    color: ${COLOURS.mask.placeholder.regular};
    border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.regular};

    &:hover {
      border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.hover};
    }
  }

  .${STATES_CLASSNAMES.isLarge} & {
    height: ${compositeMask.height.large};
    line-height: ${compositeMask.lineHeight.large};
    font-size: ${compositeMask.font.large};

    span {
      height: ${compositeMask.height.large};
      line-height: ${compositeMask.lineHeight.large};
    }
  }
`
