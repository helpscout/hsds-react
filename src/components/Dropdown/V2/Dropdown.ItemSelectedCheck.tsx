import * as React from 'react'
import Icon from '../../Icon'
import { ItemSelectedCheckUI } from './Dropdown.css'

const ItemSelectedCheck = props => {
  return (
    <ItemSelectedCheckUI>
      <span>{props.value}</span>
      {props.isActive ? <Icon name="check" /> : null}
    </ItemSelectedCheckUI>
  )
}

export default ItemSelectedCheck
