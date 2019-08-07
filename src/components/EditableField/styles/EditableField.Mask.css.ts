import styled from '../../styled/index'
import { FONT_FAMILY } from '../../../styles/configs/constants'
import { COLOURS, CONTENT_HEIGHT } from '../EditableField.utils'

export const ComponentUI = styled('div')`
  position: relative;
  display: inline-block;
  width: 100%;
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

export const MaskOptionUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  position: relative;
  width: 70px;
  height: ${CONTENT_HEIGHT - 2}px;
  margin-right: 10px;
  color: ${COLOURS.mask.regular};
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
    color: ${COLOURS.mask.placeholder.regular};
  }

  .is-disabled & {
    color: ${COLOURS.mask.disabled};
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed ${COLOURS.mask.focused};
  }

  .c-Truncate {
    width: 60px;
  }
`

export const MaskValueUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  height: ${CONTENT_HEIGHT - 2}px;
  line-height: ${CONTENT_HEIGHT}px;
  width: 100%;
  max-width: 100%;
  color: ${COLOURS.mask.regular};
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
    border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.regular};
  }

  & .is-placeholder {
    color: ${COLOURS.mask.placeholder.regular};
  }

  .is-disabled &.with-placeholder {
    border-bottom: 1px solid ${COLOURS.invisible};
  }

  .is-disabled & {
    color: ${COLOURS.mask.disabled};
  }

  .is-disabled & .is-placeholder {
    color: ${COLOURS.mask.placeholder.disabled};
  }

  .c-Truncate {
    width: ${({ numberOfActions }) => `calc(100% - ${numberOfActions * 20}px)`};
  }

  &:focus {
    width: auto;
    outline: 0;
    border-bottom: 1px dashed ${COLOURS.mask.focused};

    .c-Truncate {
      width: 100%;
    }
  }
`
