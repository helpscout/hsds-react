// Deprecated
/* istanbul ignore file */
import React from 'react'
import Icon from '../Icon'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { isSelectedItemEmpty } from './Dropdown.utils'
import { ItemSelectedCheckUI, SelectedCheckmarkUI } from './Dropdown.css'

const defaultProps = {
  value: '',
  isActive: false,
  isSelectionClearer: false,
  getState: noop,
}

const DropdownItemSelectedCheck = (props = defaultProps) => {
  let isClearerActive = false
  const state = props.getState()

  if (props.isSelectionClearer && state) {
    isClearerActive = isSelectedItemEmpty(state.selectedItem)
  }

  const componentClassnames = classNames(
    'c-ItemSelectedCheck',
    props.isSelectionClearer && 'selectionClearer',

    isClearerActive && 'is-selectionClearer-active'
  )

  const content = props.label || props.value

  return (
    <ItemSelectedCheckUI className={componentClassnames}>
      <span className="c-ItemSelectedCheck__value">{content}</span>
      <SelectedCheckmarkUI>
        {props.isActive || isClearerActive ? <Icon name="check" /> : null}
      </SelectedCheckmarkUI>
    </ItemSelectedCheckUI>
  )
}

DropdownItemSelectedCheck.defaultProps = defaultProps
DropdownItemSelectedCheck.displayName = 'DropdownItemSelectedCheck'

export default DropdownItemSelectedCheck
