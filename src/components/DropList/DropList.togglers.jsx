import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { classNames } from '../../utilities/classNames'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'
import { noop } from '../../utilities/other'
import ControlGroup from '../ControlGroup'
import HSDSButton from '../Button'
import Icon from '../Icon'

export const Button = forwardRef(
  (
    {
      text = '',
      isActive = false,
      kind = 'primary',
      size = 'lg',
      onClick = noop,
    },
    ref
  ) => {
    return (
      <HSDSButton
        aria-label="toggle menu"
        buttonRef={ref}
        className="DropListToggler ButtonToggler"
        data-cy="DropList.ButtonToggler"
        isActive={isActive}
        kind={kind}
        onClick={onClick}
        size={size}
        type="button"
      >
        <span>{text}</span>
      </HSDSButton>
    )
  }
)

export const NavLink = forwardRef(
  (
    {
      text = '',
      isActive = false,
      kind = 'primary',
      size = 'lg',
      onClick = noop,
    },
    ref
  ) => {
    return (
      <NavLinkTogglerUI
        aria-label="toggle menu"
        ref={ref}
        className={classNames(
          'DropListToggler',
          'NavLinkToggler',
          isActive && 'is-active'
        )}
        data-cy="DropList.NavLinkToggler"
        isActive={isActive}
        onClick={onClick}
        type="button"
      >
        <span>{text}</span>
        <Icon name="caret-down" size="14" />
      </NavLinkTogglerUI>
    )
  }
)

const NavLinkTogglerUI = styled('button')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 55px;
  padding: 0 18px;
  background: transparent;
  border: 0;
  font-family: ${AKTIV_FONT_FAMILY};
  font-size: 14px;
  color: ${getColor('blue.300')};
  cursor: pointer;

  &.is-active {
    color: white;
  }

  .c-Icon {
    margin: 3px 0 0 3px;
  }
`

export const SplitButton = forwardRef(
  (
    {
      text = '',
      kind = 'primary',
      size = 'lg',
      onActionClick = noop,
      onClick = noop,
      isActive = false,
    },
    ref
  ) => {
    return (
      <ControlGroup
        className="DropListToggler SplitButtonToggler"
        data-cy="DropList.SplitButtonToggler"
      >
        <ControlGroup.Item>
          <HSDSButton
            className="SplitButton__Action"
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
            aria-label="toggle menu"
            buttonRef={ref}
            className="SplitButton__Toggler"
            isActive={isActive}
            isLast
            kind={kind}
            onClick={onClick}
            size={size}
            type="button"
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
      aria-label="toggle menu"
      className="DropListToggler SelectTagToggler"
      data-cy="DropList.SelectTagToggler"
      onClick={onClick}
      ref={ref}
      type="button"
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

const KebabUI = styled('button')`
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

export const Kebab = forwardRef(({ onClick = noop }, ref) => {
  return (
    <KebabUI
      aria-label="toggle menu"
      className="DropListToggler KebabToggler"
      data-cy="DropList.KebabToggler"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <Icon name="kebab" size="24" />
    </KebabUI>
  )
})

const IconButtonUI = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 34px;
  padding: 5px;
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

  .is-iconName-caret-down {
    margin-left: -3px;
  }
`

export const IconButton = forwardRef(
  ({ onClick = noop, iconName = 'assign' }, ref) => {
    return (
      <IconButtonUI
        aria-label="toggle menu"
        className="DropListToggler IconButtonToggler"
        data-cy="DropList.IconButtonToggler"
        onClick={onClick}
        ref={ref}
        type="button"
      >
        <Icon name={iconName} size="24" />
        <Icon name="caret-down" size="14" />
      </IconButtonUI>
    )
  }
)

export function getTogglerPlacementProps(toggler) {
  if (toggler.type === Button) {
    return {
      placement: 'bottom-end',
      offset: [0, 5],
    }
  }

  if (toggler.type === NavLink) {
    return {
      placement: 'bottom',
      offset: [0, -10],
    }
  }

  if (toggler.type === Kebab) {
    return {
      placement: 'bottom-end',
      offset: [0, 3],
    }
  }

  if (toggler.type === SplitButton) {
    return {
      placement: 'bottom-end',
      offset: [0, 5],
    }
  }

  if (toggler.type === IconButton) {
    return {
      placement: 'bottom-start',
      offset: [-5, 0],
    }
  }

  if (toggler.type === SelectTag) {
    return {
      placement: 'bottom-start',
      offset: [0, 5],
    }
  }

  return {
    placement: 'bottom-start',
    offset: [0, 0],
  }
}
