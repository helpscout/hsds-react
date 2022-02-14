import React, { forwardRef } from 'react'
import Icon from '../Icon'
import { TogglerUI } from './EmojiPicker.css'

function noop() {}

export const IconToggler = forwardRef(
  ({ isActive = false, size = '24', onClick = noop, ...rest }, ref) => {
    return (
      <TogglerUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        data-cy="EmojiPickerToggler"
        data-testid="EmojiPickerToggler"
        isActive={isActive}
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        <Icon size={size} />
      </TogglerUI>
    )
  }
)
