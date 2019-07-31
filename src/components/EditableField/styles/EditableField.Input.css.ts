import styled from '../../styled/index'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'
import { FONT_FAMILY } from '../../../styles/configs/constants'

import {
  EF_I_COMPONENT_KEY,
  getComponentClassNames,
} from '../EditableField.utils'

const CLASSNAMES: any = getComponentClassNames(EF_I_COMPONENT_KEY)
const CONTENT_HEIGHT = 25
const COLOURS = {
  static: {
    border: getColor('charcoal.200'),
    disabled: getColor('charcoal.300'),
    focused: 'rgba(197, 208, 217, 0.5)',
    regular: getColor('charcoal.800'),
    placeholder: {
      regular: getColor('charcoal.300'),
      disabled: getColor('charcoal.200'),
      border: {
        regular: getColor('grey.800'),
        hover: getColor('blue.500'),
      },
    },
  },
  interactive: {
    regular: getColor('charcoal.800'),
    placeholder: getColor('charcoal.300'),
  },
  focusIndicator: {
    active: getColor('blue.500'),
    inactive: '#c6d0d8',
  },
  invisible: 'transparent',
  button: {
    regular: 'slategray',
    hover: '#3c5263',
    delete: getColor('red.500'),
  },
}

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
  ${baseStyles};
  position: relative;
  height: ${CONTENT_HEIGHT}px;
  margin-bottom: 2px;
  width: ${({ dynamicFieldWidth, renderAsBlock }) =>
    renderAsBlock ? 'auto' : `${dynamicFieldWidth}`};
  transition: width 0.2s ease-in-out;

  &:hover .${CLASSNAMES.actions} {
    opacity: 1;
  }

  &:hover .${CLASSNAMES.staticOption}, &:hover .${CLASSNAMES.staticValue} {
    border-bottom: 1px dashed ${COLOURS.static.border};
  }

  &.is-active:hover .${CLASSNAMES.actions} {
    display: none;
    cursor: initial;
  }

  &:hover .with-placeholder {
    border-bottom: 1px dashed ${COLOURS.static.placeholder.border.hover};
  }

  .is-disabled
    &:hover
    .${CLASSNAMES.staticOption},
    .is-disabled
    &:hover
    .${CLASSNAMES.staticValue} {
    border-bottom: 1px solid ${COLOURS.invisible};
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
  border-bottom: 1px solid ${COLOURS.invisible};

  .is-disabled &:hover {
    cursor: initial;
    border-bottom: 1px solid ${COLOURS.invisible};
  }

  .is-active & {
    pointer-events: none;
    z-index: 2;
    border-bottom-color: ${COLOURS.invisible} !important;
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
  font-family: ${FONT_FAMILY};
  font-size: 14px;
  pointer-events: auto;

  .is-disabled & ${`.${CLASSNAMES.dropDown}`}:hover {
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

  .${CLASSNAMES.dropDownTrigger}, ${`.${CLASSNAMES.dropDownTrigger}`}:hover {
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

  &:hover .c-Icon {
    color: ${getColor('charcoal.200')};
  }
  .is-active &:hover .c-Icon {
    color: ${getColor('charcoal.800')};
  }

  .is-active & {
    color: ${getColor('charcoal.800')};

    & + .${CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
      height: 1px;
      background-color: ${COLOURS.focusIndicator.inactive};
    }
  }

  .is-active ${`.${CLASSNAMES.dropDownTrigger}`}:focus & {
    outline: none;

    & + .${CLASSNAMES.focusIndicator} {
      transform: scaleX(1);
      background-color: ${COLOURS.focusIndicator.active};
      height: 2px;
    }
  }

  &:focus {
    & + .${CLASSNAMES.focusIndicator} {
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
  &.${CLASSNAMES.input} {
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

    .is-active &:focus {
      outline: none;

      & + .${CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        background-color: ${COLOURS.focusIndicator.active} !important;
        height: 2px;
      }
    }

    .is-active & {
      outline: none;
      color: ${COLOURS.interactive.regular};
      z-index: 2;
      cursor: initial;

      & + .${CLASSNAMES.focusIndicator} {
        transform: scaleX(1);
        height: 1px;
        background-color: #c6d0d8;
      }

      &::placeholder {
        color: ${COLOURS.interactive.placeholder};
        opacity: 1;
      }
    }

    .is-empty & {
      cursor: pointer;
    }

    .is-disabled & {
      cursor: not-allowed;
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
  font-family: ${FONT_FAMILY};

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
  color: ${COLOURS.static.regular};
  font-family: ${FONT_FAMILY};
  font-size: 14px;
  font-weight: 500;
  line-height: ${CONTENT_HEIGHT}px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid ${COLOURS.invisible};

  .is-empty & {
    display: none;
  }

  .is-active & {
    z-index: 1;
    display: inline-block;
  }

  & .is-placeholder {
    color: ${COLOURS.static.placeholder.regular};
  }

  .is-disabled & {
    color: ${COLOURS.static.disabled};
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed ${COLOURS.static.focused};
  }

  .c-Truncate {
    width: 60px;
  }
`

export const StaticValueUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  height: ${CONTENT_HEIGHT - 2}px;
  line-height: ${CONTENT_HEIGHT}px;
  width: 100%;
  max-width: 100%;
  color: ${COLOURS.static.regular};
  font-family: ${FONT_FAMILY};
  font-size: 14px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid ${COLOURS.invisible};

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
    border-bottom: 1px dashed ${COLOURS.static.placeholder.border.regular};
  }

  & .is-placeholder {
    color: ${COLOURS.static.placeholder.regular};
  }

  .is-disabled &.with-placeholder {
    border-bottom: 1px solid ${COLOURS.invisible};
  }

  .is-disabled & {
    color: ${COLOURS.static.disabled};
  }

  .is-disabled & .is-placeholder {
    color: ${COLOURS.static.placeholder.disabled};
  }

  .c-Truncate {
    width: ${({ renderAsBlock, numberOfActions }) =>
      renderAsBlock ? `calc(100% - ${numberOfActions * 20}px)` : '100%'};
  }

  &:focus {
    width: auto;
    outline: 0;
    border-bottom: 1px dashed ${COLOURS.static.focused};

    .c-Truncate {
      width: 100%;
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
`

export const FieldActionsUI = styled('div')`
  ${({ numberOfActions }) => `width: ${numberOfActions * 25 + 5}px;`}
  height: 21px;
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
  &.${CLASSNAMES.fieldButton} {
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

    .c-Icon {
      width: 24px;
      transform: translateX(3px);
    }
  }
`
