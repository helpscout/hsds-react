import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'
import { noop } from '../../utilities/other'
import HSDSButton from '../Button'
import Icon from '../Icon'

export const Button = forwardRef(
  ({ text = '', kind = 'primary', onClick = noop }, ref) => {
    return (
      <HSDSButton
        className="DropListToggler ButtonToggler"
        type="button"
        aria-label="toggle menu"
        kind={kind}
        onClick={onClick}
        buttonRef={ref}
      >
        {text}
      </HSDSButton>
    )
  }
)

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
