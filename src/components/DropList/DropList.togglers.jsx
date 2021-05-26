import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import ControlGroup from '../ControlGroup'
import HSDSButton from '../Button'
import Icon from '../Icon'
import { STATES } from '../../constants'
import Tooltip from '../Tooltip'

export const SimpleButton = forwardRef(
  (
    {
      text = '',
      isActive = false,
      kind = 'primary',
      size = 'lg',
      onClick = noop,
      ...rest
    },
    ref
  ) => {
    return (
      <HSDSButton
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        buttonRef={ref}
        className="DropListToggler ButtonToggler"
        data-cy="DropList.ButtonToggler"
        data-testid="DropList.ButtonToggler"
        isActive={isActive}
        kind={kind}
        onClick={onClick}
        size={size}
        type="button"
        {...rest}
      >
        <span>{text}</span>
      </HSDSButton>
    )
  }
)

// No need to test every single toggler if they're basically the same as Button
/* istanbul ignore next */
export const NavLink = forwardRef(
  (
    {
      text = '',
      isActive = false,
      kind = 'primary',
      size = 'lg',
      onClick = noop,
      ...rest
    },
    ref
  ) => {
    return (
      <NavLinkTogglerUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        ref={ref}
        className={classNames(
          'DropListToggler',
          'NavLinkToggler',
          isActive && 'is-active'
        )}
        data-cy="DropList.NavLinkToggler"
        data-testid="DropList.NavLinkToggler"
        isActive={isActive}
        onClick={onClick}
        type="button"
        {...rest}
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
  font-family: var(--HSDSGlobalFontFamily);
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

export const SplittedButton = forwardRef(
  (
    {
      text = '',
      kind = 'primary',
      size = 'lg',
      onActionClick = noop,
      onClick = noop,
      isActive = false,
      actionButtonProps = {},
      togglerButtonProps = {},
      ...rest
    },
    ref
  ) => {
    return (
      <ControlGroup
        className="DropListToggler SplitButtonTogglerControlGroup"
        data-cy="DropList.SplitButtonTogglerControlGroup"
        {...rest}
      >
        <ControlGroup.Item>
          <HSDSButton
            className="SplitButton__Action"
            data-cy="DropList.SplitButtonAction"
            data-testid="DropList.SplitButtonAction"
            kind={kind}
            onClick={onActionClick}
            size={size}
            type="button"
            {...actionButtonProps}
          >
            {text}
          </HSDSButton>
        </ControlGroup.Item>
        <ControlGroup.Item>
          <SplitButtonTogglerUI
            aria-label="toggle menu"
            aria-haspopup="true"
            aria-expanded={isActive}
            buttonRef={ref}
            className="SplitButton__Toggler"
            data-cy="DropList.SplitButtonToggler"
            data-testid="DropList.SplitButtonToggler"
            isActive={isActive}
            isLast
            kind={kind}
            onClick={onClick}
            size={size}
            type="button"
            {...togglerButtonProps}
          >
            <Icon
              name={
                togglerButtonProps.flipChevron && isActive
                  ? 'caret-up'
                  : 'caret-down'
              }
              size="14"
            />
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

const ErrorTooltipIcon = ({ error }) => {
  return (
    <Tooltip
      animationDelay={0}
      animationDuration={0}
      closeOnContentClick={true}
      display="block"
      placement="top-end"
      title={error}
    >
      <Icon name={'alert'} size={24} state={STATES.error} tabIndex={-1} />
    </Tooltip>
  )
}

export const SelectTag = forwardRef(
  ({ isActive = false, text = '', onClick = noop, error, ...rest }, ref) => {
    const className = classNames(
      'DropListToggler SelectTagToggler',
      error && 'is-error',
      isActive && 'is-active'
    )
    return (
      <SelectUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className={className}
        data-cy="DropList.SelectTagToggler"
        data-testid="DropList.SelectTagToggler"
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        <span>{text}</span>
        <SelectArrowsUI />
        {error && (
          // avoid list open/close when clicked on error icon
          <SelectErrorTooltipIconUI onClick={e => e.stopPropagation()}>
            <ErrorTooltipIcon error={error} />
          </SelectErrorTooltipIconUI>
        )}
      </SelectUI>
    )
  }
)

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
  font-family: var(--HSDSGlobalFontFamily);
  font-size: 13px;
  color: ${getColor('charcoal.600')};

  &.is-error {
    box-shadow: inset 0 0 0 2px ${getColor('red.500')};
    padding-right: 10px;
  }

  &.is-active,
  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }
`

const SelectArrowsUI = styled('div')`
  margin-left: auto;
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

const SelectErrorTooltipIconUI = styled('div')`
  margin-left: 8px;
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

// No need to test every single toggler if they're basically the same as Button
/* istanbul ignore next */
export const Kebab = forwardRef(
  ({ isActive = false, onClick = noop, ...rest }, ref) => {
    return (
      <KebabUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className="DropListToggler KebabToggler"
        data-cy="DropList.KebabToggler"
        data-testid="DropList.KebabToggler"
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        <Icon name="kebab" size="24" />
      </KebabUI>
    )
  }
)

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

// No need to test every single toggler if they're basically the same as Button
/* istanbul ignore next */
export const IconBtn = forwardRef(
  ({ isActive = false, onClick = noop, iconName = 'assign', ...rest }, ref) => {
    return (
      <IconButtonUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className="DropListToggler IconButtonToggler"
        data-cy="DropList.IconButtonToggler"
        data-testid="DropList.IconButtonToggler"
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        <Icon name={iconName} size="24" />
        <Icon name="caret-down" size="14" />
      </IconButtonUI>
    )
  }
)

// No need to test this
/* istanbul ignore next */
export function getTogglerPlacementProps(toggler, { placement, offset }) {
  if (toggler.type === SimpleButton) {
    return {
      placement: placement || 'bottom-end',
      offset: offset || [0, 5],
    }
  }

  if (toggler.type === NavLink) {
    return {
      placement: placement || 'bottom',
      offset: offset || [0, -10],
    }
  }

  if (toggler.type === Kebab) {
    return {
      placement: placement || 'bottom-end',
      offset: offset || [0, 3],
    }
  }

  if (toggler.type === SplittedButton) {
    return {
      placement: placement || 'bottom-end',
      offset: offset || [0, 5],
    }
  }

  if (toggler.type === IconBtn) {
    return {
      placement: placement || 'bottom-start',
      offset: offset || [-5, 0],
    }
  }

  if (toggler.type === SelectTag) {
    return {
      placement: placement || 'bottom-start',
      offset: offset || [0, 5],
    }
  }

  return {
    placement: placement || 'bottom-start',
    offset: offset || [0, 0],
  }
}
