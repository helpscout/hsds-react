import React, { useRef, forwardRef } from 'react'
import classNames from 'classnames'
import ControlGroup from '../ControlGroup'
import HSDSButton from '../Button'
import Icon from '../Icon'
import { STATES } from '../../constants'
import Tooltip from '../Tooltip'
import {
  IconButtonUI,
  NavLinkTogglerUI,
  SelectArrowsUI,
  SelectErrorTooltipIconUI,
  SelectUI,
  SplitButtonTogglerUI,
  SplitButtonUI,
} from './DropList.togglers.css'
import { THEME_BLUE, THEME_GREY, SIZE_LG } from '../Button/Button.utils'

const noop = () => undefined

export const SimpleButton = forwardRef(
  (
    {
      a11yLabel,
      className = '',
      isActive = false,
      theme = THEME_BLUE,
      onClick = noop,
      size = SIZE_LG,
      text = '',
      ...rest
    },
    ref
  ) => {
    return (
      <HSDSButton
        aria-label={a11yLabel || 'toggle menu'}
        aria-haspopup="true"
        aria-expanded={isActive}
        ref={ref}
        className={classNames(
          className,
          'ButtonToggler',
          isActive && 'is-active'
        )}
        data-cy="DropList.ButtonToggler"
        data-testid="DropList.ButtonToggler"
        theme={theme}
        size={size}
        onClick={onClick}
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
      a11yLabel,
      className = '',
      isActive = false,
      kind = 'primary',
      onClick = noop,
      size = SIZE_LG,
      text = '',
      ...rest
    },
    ref
  ) => {
    return (
      <NavLinkTogglerUI
        aria-label={a11yLabel || 'toggle menu'}
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
      a11yLabel,
      actionButtonProps = {},
      className = '',
      isActive = false,
      theme = THEME_BLUE,
      onActionClick = noop,
      onClick = noop,
      size = SIZE_LG,
      text = '',
      togglerButtonProps = {},
      disabled = false,
      outlined = false,
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
          <SplitButtonUI
            theme={theme}
            size={size}
            disabled={disabled}
            outlined={outlined}
            className="SplitButton__Action"
            data-cy="DropList.SplitButtonAction"
            data-testid="DropList.SplitButtonAction"
            onClick={onActionClick}
            type="button"
            {...actionButtonProps}
          >
            {text}
          </SplitButtonUI>
        </ControlGroup.Item>
        <ControlGroup.Item>
          <SplitButtonTogglerUI
            theme={theme}
            size={size}
            disabled={disabled}
            outlined={outlined}
            aria-label={a11yLabel || 'toggle menu'}
            aria-haspopup="true"
            aria-expanded={isActive}
            ref={ref}
            className={classNames(
              'SplitButton__Toggler',
              isActive && 'is-active'
            )}
            data-cy="DropList.SplitButtonToggler"
            data-testid="DropList.SplitButtonToggler"
            isLast
            onClick={onClick}
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
      a11yLabel,
      className = '',
      error,
      isActive = false,
      onClick = noop,
      text = '',
      ...rest
    },
    ref
  ) => {
    const ariaLabelWithText = text
      ? `toggle menu, ${text} currently selected`
      : 'toggle menu'

    return (
      <SelectUI
        aria-label={a11yLabel || ariaLabelWithText}
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
      meatIcon = 'kebab',
      size = SIZE_LG,
      theme = THEME_GREY,
      onClick = noop,
      withTooltip = false,
      tooltipProps,
      ...rest
    },
    ref
  ) => {
    const tooltipRef = useRef()

    const component = (
      <IconButtonUI
        aria-haspopup="true"
        aria-expanded={isActive}
        className={classNames(
          className,
          'MeatButtonToggler',
          isActive && 'is-active'
        )}
        data-cy="DropList.MeatButtonToggler"
        data-testid="DropList.MeatButtonToggler"
        onClick={onClick}
        ref={ref}
        icon={meatIcon}
        title={a11yLabel}
        theme={theme}
        size={size}
        {...rest}
      />
    )

    return withTooltip ? (
      <Tooltip
        animationDelay={0}
        animationDuration={0}
        getTippyInstance={instance => {
          tooltipRef.current = instance.reference
        }}
        placement="top-end"
        title={a11yLabel}
        triggerTarget={tooltipRef.current && tooltipRef.current.parentElement}
        withTriggerWrapper={false}
        {...tooltipProps}
      >
        {component}
      </Tooltip>
    ) : (
      component
    )
  }
)

// No need to test every single toggler if they're basically the same as Button
/* istanbul ignore next */
export const IconBtn = forwardRef(
  (
    {
      a11yLabel = '',
      className = '',
      isActive = false,
      iconName = 'assign',
      onClick = noop,
      withTooltip = false,
      tooltipProps,
      theme = THEME_GREY,
      size = SIZE_LG,
      ...rest
    },
    ref
  ) => {
    const component = (
      <IconButtonUI
        aria-label={a11yLabel || 'toggle-menu'}
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
        icon={iconName}
        ref={ref}
        theme={theme}
        size={size}
        {...rest}
      />
    )

    return withTooltip ? (
      <Tooltip
        animationDelay={0}
        animationDuration={0}
        placement="top-end"
        title={a11yLabel}
        withTriggerWrapper={false}
        {...tooltipProps}
      >
        {component}
      </Tooltip>
    ) : (
      component
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
