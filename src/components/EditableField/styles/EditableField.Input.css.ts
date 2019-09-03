import styled from '../../styled/index'
import { getColor } from '../../../styles/utilities/color'
import { FONT_FAMILY } from '../../../styles/configs/constants'

import {
  COLOURS,
  SIZES,
  FIELDSTATES,
  INPUT_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

const { field, floatingLabel, focusIndicator, input } = SIZES

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

export const ComponentUI = styled('div')`
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

  .${STATES_CLASSNAMES.hasActiveFields} & {
    &::before {
      content: ${({ placeholder }) => `"${placeholder}"`};
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

export const TextAreaWrapperUI = styled('div')`
  position: relative;
  width: 100%;
  min-height: 200px;

  .${STATES_CLASSNAMES.isEmpty} & {
    height: ${field.height.medium};
  }
`

export const TextAreaUI = styled('textarea')`
  &.${INPUT_CLASSNAMES.textArea} {
    ${resetHSAppInputRules}
    width: 100%;
    min-height: 200px;
    padding: 0;
    border: none;
    color: ${COLOURS.invisible};
    font-family: ${FONT_FAMILY};
    font-size: ${field.font.medium};
    background: white;
    pointer-events: auto;
    background-color: lightgreen;
    resize: none;

    .${STATES_CLASSNAMES.isEmpty} & {
      min-height: ${field.height.medium};
      height: ${field.height.medium};
    }

    .${STATES_CLASSNAMES.isActive} & {
      outline: none;
      color: ${COLOURS.input.regular};
      z-index: 2;
      cursor: initial;
      min-height: 200px;

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

  .${STATES_CLASSNAMES.fieldDisabled}
    &
    ${`.${INPUT_CLASSNAMES.dropdown}`}:hover {
    cursor: initial;
  }

  .${STATES_CLASSNAMES.isEmpty} & {
    width: 0;
    margin-right: 0;
  }

  .${STATES_CLASSNAMES.isActive}.${STATES_CLASSNAMES.isEmpty} & {
    width: 60px;
    margin-right: 20px;
  }

  .${OTHERCOMPONENTS_CLASSNAMES.dropdownTrigger},
    ${`.${OTHERCOMPONENTS_CLASSNAMES.dropdownTrigger}`}:hover {
    cursor: text;
  }
`

export const TriggerUI = styled('div')`
  position: relative;
  width: 100%;
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

  .is-active ${`.${OTHERCOMPONENTS_CLASSNAMES.dropdownTrigger}`}:focus & {
    outline: none;

    & + .${INPUT_CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
      background-color: ${COLOURS.focusIndicator.active};
      height: ${focusIndicator.active};
    }
  }

  &:focus {
    & + .${INPUT_CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
    }
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
