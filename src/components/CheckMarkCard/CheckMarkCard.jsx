import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import VisuallyHidden from '../VisuallyHidden'

import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

import {
  CheckMarkCardUI,
  MarkUI,
  CheckMarkCardContentUI,
  UserNameUI,
  RoleNameUI,
  AvatarUI,
  CheckmarkCardGridUI,
} from './CheckMarkCard.css'

const uniqueID = createUniqueIDFactory('CheckMarkCard')

const useCustomId = id => {
  const customId = useRef(id || uniqueID())
  return customId.current
}

const Mark = props => {
  const { cardChecked, withStatus, iconName, iconSize, tooltipText } = props

  const isVisible = cardChecked || withStatus

  const markClassnames = classNames(
    'c-CheckMarkCard__mark',
    isVisible && 'is-visible'
  )

  const icon = (
    <Icon
      className={`${iconName}-icon mark-icon`}
      name={iconName}
      size={iconSize}
    />
  )

  // ? "Render" MarkUI below even if neither withStatus or checked with opacity 0
  // ? so we can animate the transition
  return Boolean(tooltipText) ? (
    <Tooltip
      title={tooltipText}
      triggerOn="mouseenter focus"
      appendTo={document.body}
      withTriggerWrapper={false}
    >
      <MarkUI className={markClassnames}>{icon}</MarkUI>
    </Tooltip>
  ) : (
    <MarkUI className={markClassnames}>{icon}</MarkUI>
  )
}

const CheckMarkCard = props => {
  const {
    avatar,
    checked,
    children,
    className,
    disabled,
    height,
    inputRef: inputRefProp,
    isFocused,
    label,
    iconName = 'checkmark',
    iconSize = '24',
    maxWidth,
    markColor = 'blue',
    tooltipText,
    onBlur,
    onChange,
    onFocus,
    subtitle,
    status,
    shouldDisplayLabel = true,
    value: valueProp,
    ...rest
  } = props

  const checkMarkCardRef = useRef()
  const inputRef = useRef()
  const [cardChecked, setCardChecked] = useState(checked)
  const id = useCustomId(rest.id)
  const shouldShowStatus = Boolean(status)

  const handleOnChange = (value, checked) => {
    setCardChecked(checked)
    onChange && onChange(value, checked)
  }

  const handleOnBlur = event => {
    checkMarkCardRef.current.classList.remove('is-focused')
    onBlur && onBlur(event)
  }

  const handleOnFocus = event => {
    checkMarkCardRef.current.classList.add('is-focused')
    onFocus && onFocus(event)
  }

  const setInputNodeRef = node => {
    inputRef.current = node
    inputRefProp && inputRefProp(node)
  }

  useEffect(() => {
    setCardChecked(checked)
  }, [checked])

  useEffect(() => {
    if (isFocused) {
      checkMarkCardRef.current.classList.add('is-focused')
      inputRef.current.focus()
    }
  }, [isFocused, checkMarkCardRef, inputRef])

  const checkmarkClassnames = classNames(
    'c-CheckMarkCard',
    className,
    cardChecked && !shouldShowStatus && 'is-checked',
    disabled && 'is-disabled',
    shouldShowStatus && 'with-status',
    shouldShowStatus && Boolean(status) && `is-${status}`,
    shouldShowStatus && Boolean(markColor) && `is-${markColor}`
  )

  const markProps = {
    tooltipText,
    iconName,
    iconSize,
    withStatus: shouldShowStatus,
  }

  return (
    <CheckMarkCardUI
      {...rest}
      className={checkmarkClassnames}
      htmlFor={id}
      maxWidth={maxWidth}
      height={height}
      ref={checkMarkCardRef}
    >
      <CheckMarkCardContentUI>
        <Mark cardChecked={cardChecked} {...markProps} />
        {avatar && <AvatarUI size="xl" image={avatar} name={label} />}
        {shouldDisplayLabel && <UserNameUI>{label}</UserNameUI>}
        {subtitle && <RoleNameUI>{subtitle}</RoleNameUI>}
        {children}
      </CheckMarkCardContentUI>
      <VisuallyHidden>
        <Checkbox
          checked={cardChecked}
          disabled={disabled || shouldShowStatus}
          id={id}
          inputRef={setInputNodeRef}
          label={label || valueProp}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onEnter={handleOnChange}
          value={valueProp}
        />
      </VisuallyHidden>
    </CheckMarkCardUI>
  )
}

CheckMarkCard.defaultProps = {
  checked: false,
  'data-cy': 'CheckMarkCard',
  inputRef: noop,
  isFocused: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
}

CheckMarkCard.propTypes = {
  /** Image url that will be used within the Avatar component */
  avatar: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines if the card is checked. */
  checked: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Determines if the card is disabled. */
  disabled: PropTypes.bool,
  /** Label that will be attached to the checkbox element. It will also be used as a heading bellow the avatar */
  label: PropTypes.string,
  /** Change the mark icon */
  iconName: PropTypes.string,
  /** Change the mark icon size */
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** ID for the input. */
  id: PropTypes.string,
  /** Callback to obtain the html `input` node. */
  inputRef: PropTypes.func,
  /** Whether the card should be focused */
  isFocused: PropTypes.bool,
  /** Set the height of the Card. */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  /** Change the mark background color */
  markColor: PropTypes.oneOf(['blue', 'lavender']),
  /** Set the max width of the Card. */
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  /** Callback when the input is blurred. */
  onBlur: PropTypes.func,
  /** Callback when the input value is changed. */
  onChange: PropTypes.func,
  /** Callback when the input is focused. */
  onFocus: PropTypes.func,
  /* Flag to display or not the label as a heading bellow the avatar */
  shouldDisplayLabel: PropTypes.bool,
  /** Give the card special status styles, it also disables the input */
  status: PropTypes.string,
  /** Display a light text as the last children */
  subtitle: PropTypes.string,
  /** The mark tooltip text that will appear on hover/focus */
  tooltipText: PropTypes.string,
  /** The value of the input. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
}

CheckMarkCard.Grid = CheckmarkCardGridUI

export default CheckMarkCard
