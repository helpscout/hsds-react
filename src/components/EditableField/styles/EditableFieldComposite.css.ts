import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { FONT_FAMILY } from '../../../styles/configs/constants'

import {
  COLOURS,
  EDITABLEFIELD_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

export const ComponentUI = styled('div')`
  ${baseStyles};
  display: flex;
  position: relative;

  .${EDITABLEFIELD_CLASSNAMES.component} {
    margin-right: 10px;

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
  z-index: 3;
  width: auto;
  top: 0;
  left: 0;
  height: 24px;
  line-height: 25px;
  font-family: ${FONT_FAMILY};
  font-size: 14px;

  span {
    display: inline-block;
    height: 24px;
    line-height: 25px;
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
`
