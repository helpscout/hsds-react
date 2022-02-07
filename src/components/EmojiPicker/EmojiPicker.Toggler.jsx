import React, { forwardRef } from 'react'
import Icon from '../Icon'
import { TogglerUI } from './EmojiPicker.css'

export const IconToggler = forwardRef(
  (
    { isActive = false, size = '24', onClick = () => undefined, ...rest },
    ref
  ) => {
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
