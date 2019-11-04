import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { FONT_FAMILY } from '../../../styles/configs/constants'

import {
  COLOURS,
  SIZES,
  EDITABLEFIELD_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

const { compositeMask } = SIZES

export const ComponentUI = styled('div')`
  ${baseStyles};
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
