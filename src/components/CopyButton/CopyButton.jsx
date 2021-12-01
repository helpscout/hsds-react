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

const WrappedCopybutton = React.forwardRef(function CopyButton(props, ref) {
  const {
    className,
    icon,
    label,
    onClick,
    onReset,
    outlined,
    resetTimeout,
    size,
    theme,
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
      size={size}
      theme={theme}
      outlined={outlined}
      {...getValidProps(rest)}
      onClick={handleClick}
      className={componentClassName}
      ref={ref}
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
})

WrappedCopybutton.defaultProps = {
  'data-cy': 'CopyButton',
  theme: 'blue',
  label: 'Copy',
  onClick: noop,
  onReset: noop,
  resetTimeout: 2000,
  size: 'sm',
  outlined: true,
}

WrappedCopybutton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func,
  onReset: PropTypes.func,
  resetTimeout: PropTypes.number,
  /** Sets the button size. */
  size: PropTypes.string,
  /** Sets the button theme. */
  theme: PropTypes.string,
  title: PropTypes.string,

  /** Set the outlined style to the button. */
  outlined: PropTypes.bool,
}

export default WrappedCopybutton
