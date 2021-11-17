import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import {
  CopyButtonUI,
  ConfirmationIconWrapperUI,
  TextUI,
  IconUI,
} from './CopyButton.css'

const CopyButton = props => {
  const {
    className,
    size,
    icon,
    label,
    onReset,
    resetTimeout,
    onClick,
    ...rest
  } = props

  const [shouldRenderConfirmation, setConfirmation] = useState()
  const confirmationTimeout = useRef()

  useEffect(() => {
    if (confirmationTimeout.current) {
      clearTimeout(confirmationTimeout)
    }
    return () => {
      if (confirmationTimeout.current) {
        clearTimeout(confirmationTimeout)
      }
    }
  }, [])

  const handleClick = e => {
    if (confirmationTimeout.current) {
      clearTimeout(confirmationTimeout)
    }

    setConfirmation(true)
    onClick(e)

    confirmationTimeout.current = setTimeout(() => {
      setConfirmation(false)
      onReset()
    }, resetTimeout)
  }

  const componentClassName = classNames(
    'c-CopyButton',
    shouldRenderConfirmation && 'is-copyConfirmed',
    icon && 'is-with-icon',
    className
  )
  const iconSize = size === 'sm' ? '20' : '24'

  return (
    <CopyButtonUI
      {...getValidProps(rest)}
      onClick={handleClick}
      size={size}
      className={componentClassName}
    >
      <ConfirmationIconWrapperUI>
        <Icon
          className="c-CopyButton__iconConfirmation"
          name="checkmark"
          size={iconSize}
        />
      </ConfirmationIconWrapperUI>
      {icon && <IconUI size={iconSize} name={icon} />}
      {label && <TextUI>{label}</TextUI>}
    </CopyButtonUI>
  )
}

CopyButton.defaultProps = {
  'data-cy': 'CopyButton',
  kind: 'secondary',
  label: 'Copy',
  onClick: noop,
  onReset: noop,
  resetTimeout: 2000,
  size: 'sm',
}

CopyButton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Applies the specified style to the button.
   * 'primary': Blue button. Used for primary actions.
   * 'primaryAlt': Purple button. Used for primary actions.
   * 'secondary': White button with a border. Used for secondary actions.
   * 'secondaryAlt': White button with a green border. Used for secondary actions.
   * 'default': Borderless button. Used for subtle/tertiary actions.
   * 'link': Button that looks like a `Link`. Used for subtle/tertiary actions.
   */
  kind: PropTypes.oneOf([
    'primary',
    'primaryAlt',
    'secondary',
    'secondaryAlt',
    'default',
    'link',
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func,
  onReset: PropTypes.func,
  resetTimeout: PropTypes.number,
  /** Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`. */
  size: PropTypes.any,
  title: PropTypes.string,
}

export default CopyButton
