import styled from '../../styled/index'
import { getColor } from '../../../styles/utilities/color'
import { FONT_FAMILY } from '../../../styles/configs/constants'

import {
  COLOURS,
  CONTENT_HEIGHT,
  INPUT_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

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
  height: ${CONTENT_HEIGHT}px;
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-bottom: 1px solid ${COLOURS.invisible};

  .${STATES_CLASSNAMES.isDisabled} &:hover {
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
  height: ${CONTENT_HEIGHT - 2}px;
  width: 100%;

  .${STATES_CLASSNAMES.hasOptions} & {
    width: calc(100% - 70px);
  }

  .${STATES_CLASSNAMES.isEmpty} & {
    width: 100%;
  }

  &::before {
    opacity: 0;
    will-change: opacity, transform;
    transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
    pointer-events: none;
  }

  .${STATES_CLASSNAMES.hasActiveFields} & {
    &::before {
      content: ${({ placeholder }) => `"${placeholder}"`};
      opacity: ${({ value }) => (value ? '1' : '0')};
      transform: ${({ value }) =>
        value ? 'translateY(0)' : 'translateY(10px)'};
      position: absolute;
      z-index: 5;
      top: -20px;
      left: 0;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      color: ${COLOURS.floatingLabel};
    }
  }
`

export const OptionsWrapperUI = styled('div')`
  position: relative;
  width: 60px;
  height: ${CONTENT_HEIGHT}px;
  margin-right: 20px;
  font-family: ${FONT_FAMILY};
  font-size: 14px;
  pointer-events: auto;

  .${STATES_CLASSNAMES.isDisabled} & ${`.${INPUT_CLASSNAMES.dropdown}`}:hover {
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
  margin-bottom: 5px;
  background: white;
  font-family: ${FONT_FAMILY};
  font-size: 14px;
  line-height: ${CONTENT_HEIGHT}px;
  height: ${CONTENT_HEIGHT - 2}px;
  color: ${COLOURS.invisible};
  font-family: ${FONT_FAMILY};

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
      height: 1px;
      background-color: ${COLOURS.focusIndicator.inactive};
    }
  }

  .is-active ${`.${OTHERCOMPONENTS_CLASSNAMES.dropdownTrigger}`}:focus & {
    outline: none;

    & + .${INPUT_CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
      background-color: ${COLOURS.focusIndicator.active};
      height: 2px;
    }
  }

  &:focus {
    & + .${INPUT_CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
    }
  }

  & .c-Icon {
    position: absolute;
    right: -5px;
    top: 3px;
  }

  & .c-Truncate {
    width: 60px;
  }
`

export const InputUI = styled('input')`
  /* Guard styles from other globally applied rules for input tags */
  &.${INPUT_CLASSNAMES.input} {
    ${resetHSAppInputRules}
    width: 100%;
    height: ${CONTENT_HEIGHT}px;
    line-height: ${CONTENT_HEIGHT}px;
    padding: 0;
    border: none;
    color: ${COLOURS.invisible};
    font-family: ${FONT_FAMILY};
    font-size: 14px;
    background: white;
    pointer-events: auto;

    &::placeholder {
      color: ${COLOURS.invisible};
    }

    .${STATES_CLASSNAMES.isActive} &:focus {
      outline: none;

      & + .${INPUT_CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        background-color: ${COLOURS.focusIndicator.active} !important;
        height: 2px;
      }
    }

    .${STATES_CLASSNAMES.isActive} & {
      outline: none;
      color: ${COLOURS.input.regular};
      z-index: 2;
      cursor: initial;

      & + .${INPUT_CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        height: 1px;
        background-color: #c6d0d8;
      }

      &::placeholder {
        color: ${COLOURS.input.placeholder};
        opacity: 1;
      }
    }

    .${STATES_CLASSNAMES.isEmpty} & {
      cursor: pointer;
    }

    .${STATES_CLASSNAMES.isDisabled} & {
      cursor: not-allowed;
    }

    .${STATES_CLASSNAMES.isEmpty} &:focus {
      cursor: initial;
    }

    .${STATES_CLASSNAMES.hasActiveFields} & {
      color: ${COLOURS.input.regular};

      & + .${INPUT_CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        height: 1px;
        background-color: ${COLOURS.focusIndicator.inactive};
      }

      &::placeholder {
        color: ${COLOURS.input.placeholder};
        opacity: 1;
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
  }
`

export const FocusIndicatorUI = styled('span')`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${COLOURS.focusIndicator.active};
  transform-origin: bottom left;
  transform: scaleX(0);
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 3;
  will-change: transform, background-color;
`
