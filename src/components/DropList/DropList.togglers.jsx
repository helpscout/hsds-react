import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'
import { noop } from '../../utilities/other'
import ControlGroup from '../ControlGroup'
import HSDSButton from '../Button'
import Icon from '../Icon'

export const CLASSNAMES = {
  SPLITBUTTON_ACTION: 'SplitButton__Action',
}

export const Button = forwardRef(
  ({ text = '', kind = 'primary', size = 'lg', onClick = noop }, ref) => {
    return (
      <HSDSButton
        aria-label="toggle menu"
        buttonRef={ref}
        className="DropListToggler ButtonToggler"
        kind={kind}
        onClick={onClick}
        size={size}
        type="button"
      >
        {text}
      </HSDSButton>
    )
  }
)

export const SplitButton = forwardRef(
  (
    {
      text = '',
      kind = 'primary',
      size = 'lg',
      onActionClick = noop,
      onClick = noop,
    },
    ref
  ) => {
    return (
      <ControlGroup className="DropListToggler SplitButtonToggler">
        <ControlGroup.Item>
          <HSDSButton
            aria-label="toggle menu"
            className={CLASSNAMES.SPLITBUTTON_ACTION}
            kind={kind}
            onClick={onActionClick}
            size={size}
            type="button"
          >
            {text}
          </HSDSButton>
        </ControlGroup.Item>
        <ControlGroup.Item>
          <SplitButtonTogglerUI
            buttonRef={ref}
            className="SplitButton__Toggler"
            isLast
            kind={kind}
            onClick={onClick}
            size={size}
          >
            <Icon name="caret-down" size="14" />
          </SplitButtonTogglerUI>
        </ControlGroup.Item>
      </ControlGroup>
    )
  }
)

const SplitButtonTogglerUI = styled(HSDSButton)`
  &.SplitButton__Toggler {
    min-width: 30px !important;
    padding: 0;
    pointer-events: all;

    &.is-primary {
      box-shadow: -1px 0 0 ${getColor('blue.600')};

      &.is-success {
        box-shadow: -1px 0 0 ${getColor('green.600')};
      }
      &.is-danger {
        box-shadow: -1px 0 0 ${getColor('red.600')};
      }
      &[disabled] {
        box-shadow: -1px 0 0 ${getColor('grey.600')};
      }
    }

    .c-Button__content {
      padding-top: 2px;
      width: 16px;
    }
  }
`

export const SelectTag = forwardRef(({ text = '', onClick = noop }, ref) => {
  return (
    <SelectUI
      className="DropListToggler SelectToggler"
      ref={ref}
      type="button"
      aria-label="toggle menu"
      onClick={onClick}
    >
      <span>{text}</span>
      <SelectArrowsUI />
    </SelectUI>
  )
})

const SelectUI = styled('button')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 38px;
  padding: 0 15px;
  margin: 0;
  background: white;
  border: 0;
  box-shadow: inset 0 0 0 1px ${getColor('grey.800')};
  box-sizing: border-box;
  border-radius: 3px;
  font-family: ${AKTIV_FONT_FAMILY};
  font-size: 13px;
  color: ${getColor('charcoal.600')};

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }
`

const SelectArrowsUI = styled('div')`
  width: 7px;
  height: 14px;
  position: relative;

  &::before,
  &::after {
    content: '';
    border-left: 3.5px solid transparent;
    border-right: 3.5px solid transparent;
    position: absolute;
    left: 0;
  }

  &::before {
    border-bottom: 6px solid ${getColor('charcoal.700')};
    top: 0;
  }

  &::after {
    border-top: 6px solid ${getColor('charcoal.700')};
    bottom: 0;
  }
`

const ThreeDotsUI = styled('button')`
  width: 24px;
  height: 24px;
  padding: 0.5px 0px 0px 0.5px;
  border: 0;
  border-radius: 3px;
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }
`

export const ThreeDots = forwardRef(({ onClick = noop }, ref) => {
  return (
    <ThreeDotsUI
      className="DropListToggler ThreeDotsToggler"
      ref={ref}
      type="button"
      aria-label="toggle menu"
      onClick={onClick}
    >
      <Icon name="kebab" size="24" />
    </ThreeDotsUI>
  )
})
