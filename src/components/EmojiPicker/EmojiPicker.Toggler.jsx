import React, { forwardRef } from 'react'
import { noop } from '../../utilities/other'
import Icon from '../Icon'
import { TogglerUI } from './EmojiPicker.css'

export const IconToggler = forwardRef(
  ({ isActive = false, size = '24', onClick = noop, ...rest }, ref) => {
    return (
      <TogglerUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className="c-EmojiPickerToggler"
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
