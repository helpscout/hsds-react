import styled from 'styled-components'
import { FONT_FAMILY } from '../../../styles/configs/constants'
import {
  COLOURS,
  SIZES,
  EDITABLEFIELD_CLASSNAMES,
  TRUNCATED_CLASSNAMES,
  STATES_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
} from '../EditableField.utils'

const { field, mask } = SIZES

export const ComponentUI = styled('div')`
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
