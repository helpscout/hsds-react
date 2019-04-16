import * as React from 'react'
import Icon from '../../Icon'
import { ItemSelectedCheckUI } from './Dropdown.css'

const ItemSelectedCheck = props => {
  if (!props) return null
  if (!props.value) return null

  return (
    <ItemSelectedCheckUI className="c-ItemSelectedCheck">
      <span className="c-ItemSelectedCheck__value">{props.value}</span>
      {props.isActive ? <Icon name="check" /> : null}
    </ItemSelectedCheckUI>
  )
}

export default ItemSelectedCheck
