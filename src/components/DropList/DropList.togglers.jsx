import React, { useRef, forwardRef } from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import ControlGroup from '../ControlGroup'
import HSDSButton from '../Button'
import Icon from '../Icon'
import VisuallyHidden from '../VisuallyHidden'
import { STATES } from '../../constants'
import Tooltip from '../Tooltip'
import {
  IconButtonUI,
  MeatButtonUI,
  NavLinkTogglerUI,
  SelectArrowsUI,
  SelectErrorTooltipIconUI,
  SelectUI,
  SplitButtonTogglerUI,
} from './DropList.togglers.css'

export const SimpleButton = forwardRef(
  (
    {
      className = '',
      isActive = false,
      kind = 'primary',
      onClick = noop,
      size = 'lg',
      text = '',
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
        className={classNames(
          className,
          'ButtonToggler',
          isActive && 'is-active'
        )}
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
      className = '',
      isActive = false,
      kind = 'primary',
      onClick = noop,
      size = 'lg',
      text = '',
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
          className,
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

export const SplittedButton = forwardRef(
  (
    {
      actionButtonProps = {},
      className = '',
      isActive = false,
      kind = 'primary',
      onActionClick = noop,
      onClick = noop,
      size = 'lg',
      text = '',
      togglerButtonProps = {},
      ...rest
    },
    ref
  ) => {
    return (
      <ControlGroup
        className={classNames(className, 'SplitButtonTogglerControlGroup')}
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
            className={classNames(
              'SplitButton__Toggler',
              isActive && 'is-active'
            )}
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
  (
    {
      className = '',
      error,
      isActive = false,
      onClick = noop,
      text = '',
      ...rest
    },
    ref
  ) => {
    return (
      <SelectUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className={classNames(
          className,
          'SelectTagToggler',
          error && 'is-error',
          isActive && 'is-active'
        )}
        data-cy="DropList.SelectTagToggler"
        data-testid="DropList.SelectTagToggler"
        isActive={isActive}
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

// No need to test every single toggler if they're basically the same as Button
/* istanbul ignore next */
export const MeatButton = forwardRef(
  (
    {
      a11yLabel = '',
      className = '',
      isActive = false,
      iconSize = '24',
      meatIcon = 'kebab',
      onClick = noop,
      withTooltip = false,
      ...rest
    },
    ref
  ) => {
    const tooltipRef = useRef()

    return (
      <MeatButtonUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className={classNames(
          className,
          'MeatButtonToggler',
          isActive && 'is-active'
        )}
        data-cy="DropList.MeatButtonToggler"
        data-testid="DropList.MeatButtonToggler"
        isActive={isActive}
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        {withTooltip ? (
          <Tooltip
            animationDelay={0}
            animationDuration={0}
            getTippyInstance={instance => {
              tooltipRef.current = instance.reference
            }}
            placement="top-end"
            title={a11yLabel}
            triggerTarget={
              tooltipRef.current && tooltipRef.current.parentElement
            }
          >
            <Icon name={meatIcon} size={iconSize} />
          </Tooltip>
        ) : (
          <Icon name={meatIcon} size={iconSize} />
        )}
        {a11yLabel ? <VisuallyHidden>{a11yLabel}</VisuallyHidden> : null}
      </MeatButtonUI>
    )
  }
)

// No need to test every single toggler if they're basically the same as Button
/* istanbul ignore next */
export const IconBtn = forwardRef(
  (
    {
      a11yLabel = '',
      caretSize = '14',
      className = '',
      isActive = false,
      iconName = 'assign',
      iconSize = '24',
      onClick = noop,
      withCaret = true,
      withTooltip = false,
      ...rest
    },
    ref
  ) => {
    const tooltipRef = useRef()

    return (
      <IconButtonUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className={classNames(
          className,
          'IconButtonToggler',
          isActive && 'is-active'
        )}
        data-cy="DropList.IconButtonToggler"
        data-testid="DropList.IconButtonToggler"
        isActive={isActive}
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        {withTooltip ? (
          <Tooltip
            animationDelay={0}
            animationDuration={0}
            getTippyInstance={instance => {
              tooltipRef.current = instance.reference
            }}
            placement="top-end"
            title={a11yLabel}
            triggerTarget={
              tooltipRef.current && tooltipRef.current.parentElement
            }
          >
            <Icon name={iconName} size={iconSize} />
          </Tooltip>
        ) : (
          <Icon Name={iconName} Size={iconSize} />
        )}
        {a11yLabel ? <VisuallyHidden>{a11yLabel}</VisuallyHidden> : null}
        {withCaret ? <Icon name="caret-down" size={caretSize} /> : null}
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

  if (toggler.type === MeatButton) {
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
