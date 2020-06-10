import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { isSelectedItemEmpty } from './Dropdown.utils'
import { ItemSelectedCheckUI, SelectedCheckmarkUI } from './Dropdown.css'

const DropdownItemSelectedCheck = props => {
  const {
    getState,
    isSelectionClearer,
    isActive,
    label,
    value,
    ...rest
  } = props
  let isClearerActive = false
  const state = getState()

  if (isSelectionClearer && state) {
    isClearerActive = isSelectedItemEmpty(state.selectedItem)
  }

  const componentClassnames = classNames(
    'c-ItemSelectedCheck',
    isSelectionClearer && 'selectionClearer',
    isClearerActive && 'is-selectionClearer-active'
  )

  return (
    <ItemSelectedCheckUI
      className={componentClassnames}
      {...getValidProps(rest)}
    >
      <span className="c-ItemSelectedCheck__value">{label || value}</span>
      <SelectedCheckmarkUI>
        {isActive || isClearerActive ? <Icon name="check" /> : null}
      </SelectedCheckmarkUI>
    </ItemSelectedCheckUI>
  )
}

DropdownItemSelectedCheck.defaultProps = {
  value: '',
  'data-cy': 'DropdownItemSelectedCheck',
  isActive: false,
  isSelectionClearer: false,
  getState: noop,
}

export default DropdownItemSelectedCheck
