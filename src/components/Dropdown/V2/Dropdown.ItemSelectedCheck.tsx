import * as React from 'react'
import Icon from '../../Icon'
import { classNames } from '../../../utilities/classNames'
import { isSelectedItemEmpty } from './Dropdown.utils'
import { ItemSelectedCheckUI } from './Dropdown.css'

const ItemSelectedCheck = props => {
  if (!props) return null
  if (!props.value) return null

  let isClearerActive = false

  if (props.isSelectionClearer) {
    const state = props.getState()
    const { selectedItem } = state
    isClearerActive = isSelectedItemEmpty(selectedItem)
  }

  const componentClassnames = classNames(
    'c-ItemSelectedCheck',
    props.isSelectionClearer && 'selectionClearer',
    /* istanbul ignore next */
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
