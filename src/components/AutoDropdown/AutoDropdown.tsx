import * as React from 'react'
import ComboBox from '../ComboBox'
import { DropdownProps } from '../Dropdown/Dropdown.types'
import { initialState } from '../Dropdown/Dropdown.store'

export interface Props extends DropdownProps {
  limit: number
}

export class AutoDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    ...initialState,
    limit: 15,
  }

  render() {
    const { items, limit, ...rest } = this.props

    return <ComboBox {...rest} showInput={items.length > limit} items={items} />
  }
}

export default AutoDropdown
