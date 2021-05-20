import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  CheckMarkCardUI,
  MarkUI,
  CheckMarkCardContentUI,
} from './CheckMarkCard.css'

import Checkbox from '../Checkbox'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

const uniqueID = createUniqueIDFactory('CheckMarkCard')

const useCustomId = id => {
  const customId = useRef(id || uniqueID())
  return customId.current
}

const Mark = props => {
  const { cardChecked, withStatus } = props
  let iconName = 'checkmark'
  let iconSize = '24'
  let tooltip = null

  // If the card has a status provided, it should take precedence even if the card
  // is checked from external props for some reason
  if (withStatus) {
    iconName = withStatus.iconName
    iconSize = withStatus.iconSize || '20'
    tooltip = withStatus.tooltipText
  }

  const isVisible = cardChecked || Boolean(withStatus)

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
  return Boolean(tooltip) ? (
    <Tooltip
      title={tooltip}
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
    checked,
    children,
    className,
    disabled,
    label,
    onBlur,
    onChange,
    onFocus,
    isFocused,
    inputRef: inputRefProp,
    maxWidth,
    height,
    value: valueProp,
    withStatus,
    ...rest
  } = props

  const checkMarkCardRef = useRef()
  const inputRef = useRef()
  const [cardChecked, setCardChecked] = useState(checked)
  const id = useCustomId(rest.id)

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
    // Update the document title using the browser API
    if (isFocused) {
      checkMarkCardRef.current.classList.add('is-focused')
      inputRef.current.focus()
    }
  }, [isFocused, checkMarkCardRef, inputRef])

  const shouldShowStatus = Boolean(withStatus)
  const { status, color = 'blue' } = withStatus || {}

  const checkmarkClassnames = classNames(
    'c-CheckMarkCard',
    className,
    cardChecked && !shouldShowStatus && 'is-checked',
    disabled && 'is-disabled',
    shouldShowStatus && 'with-status',
    shouldShowStatus && Boolean(status) && `is-${status}`,
    shouldShowStatus && Boolean(color) && `is-${color}`
  )

  return (
    <CheckMarkCardUI
      {...rest}
      className={checkmarkClassnames}
      htmlFor={id}
      maxWidth={maxWidth}
      height={height}
      withStatus={withStatus}
      ref={checkMarkCardRef}
    >
      <CheckMarkCardContentUI>
        <Mark cardChecked={cardChecked} withStatus={withStatus} />
        {children}
      </CheckMarkCardContentUI>
      <VisuallyHidden>
        <Checkbox
          checked={cardChecked}
          disabled={disabled || Boolean(withStatus)}
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
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines if the card is checked. */
  checked: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Determines if the card is disabled. */
  disabled: PropTypes.bool,
  /** ID for the input. */
  id: PropTypes.string,
  /** Callback to obtain the html `input` node. */
  inputRef: PropTypes.func,
  /** Whether the card should be focused */
  isFocused: PropTypes.bool,
  /** Give the card special status styles, it also disables the input <br>
   * `status`: Not needed, but if provided it will add a class name of "is-YOUR_STATUS" to the component <br>
   * `iconName`: Icon to render <br>
   * `iconSize`: Size of the icon, default 20 <br>
   * `color`: color of the Card (border and background of the mark) <br>
   * `tooltipText`: If a tooltip is desired, provide the message here <br>
   */
  withStatus: PropTypes.shape({
    status: PropTypes.string,
    iconName: PropTypes.string,
    iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.oneOf(['blue', 'lavender']),
    tooltipText: PropTypes.string,
  }),
  /** Set the height of the Card. */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
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
  /** The value of the input. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export default CheckMarkCard
