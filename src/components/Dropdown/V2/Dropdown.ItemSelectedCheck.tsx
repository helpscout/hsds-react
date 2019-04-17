import * as React from 'react'
import Icon from '../../Icon'
import { classNames } from '../../../utilities/classNames'
import { isSelectedItemEmpty } from './Dropdown.utils'
import { ItemSelectedCheckUI } from './Dropdown.css'

const ItemSelectedCheck = props => {
  if (!props) return null
  if (!props.value) return null

  const state = props.getState()
  const { selectedItem } = state
  const isClearerActive =
    props.isSelectionClearer && isSelectedItemEmpty(selectedItem)
  const componentClassnames = classNames(
    'c-ItemSelectedCheck',
    props.isSelectionClearer && 'selectionClearer',
    isClearerActive && 'is-selectionClearer-active'
  )

  return (
    <ItemSelectedCheckUI className={componentClassnames}>
      <span className="c-ItemSelectedCheck__value">{props.value}</span>
      {props.isActive || isClearerActive ? <Icon name="check" /> : null}
    </ItemSelectedCheckUI>
  )
}

export default ItemSelectedCheck
