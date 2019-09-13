import styled from '../../styled/index'
import {
  COLOURS,
  ACTIONS_CLASSNAMES,
  STATES_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
} from '../EditableField.utils'

export const ComponentUI = styled('div')`
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
