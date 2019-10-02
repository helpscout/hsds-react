import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'
import { COLOURS, SIZES } from '../../EditableField/EditableField.utils'
import { FONT_FAMILY } from '../../../styles/configs/constants'

const { field, focusIndicator } = SIZES

export const ComponentUI = styled('div')`
  ${baseStyles};
  width: 100%;
  max-width: 100%;
  margin-bottom: 40px;
`

export const EditableTextareaUI = styled('div')`
  position: relative;
  border-bottom: 1px dashed ${COLOURS.mask.border};

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: ${focusIndicator.active};
    background-color: ${COLOURS.focusIndicator.active};
    transform-origin: bottom left;
    transform: scaleX(1);
    transition: transform 0.3s ease;
    z-index: 3;
    will-change: transform;
  }

  &.is-readonly:after {
    transform: scaleX(0);
  }

  &.is-readonly {
    border-bottom: 1px dashed ${COLOURS.invisible};

    &:hover {
      border-bottom: 1px dashed ${COLOURS.mask.border};
    }

    textarea {
      cursor: pointer;

      &::placeholder {
        color: ${COLOURS.mask.placeholder.regular};
      }
    }
  }

  &.with-placeholder.is-readonly {
    border-bottom: 1px dashed ${COLOURS.mask.border};

    &:hover {
      border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.hover};
    }
  }

  &.is-readonly.is-clamped:before {
    content: '';
    display: block;
    width: 100%;
    height: 15px;
    background: linear-gradient(to top, white, transparent);
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }

  textarea {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
    border: none;
    margin: 0;
    color: ${COLOURS.input.regular};
    font-family: ${FONT_FAMILY};
    font-size: ${field.font.medium};
    line-height: 20px;
    outline: none;
    resize: none;
    overflow: scroll;

    &::placeholder {
      color: ${COLOURS.mask.placeholder.regular};
    }
  }
`
