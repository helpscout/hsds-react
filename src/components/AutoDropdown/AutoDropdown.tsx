import * as React from 'react'
import SearchableDropdown from '../SearchableDropdown'
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

    return (
      <SearchableDropdown
        {...rest}
        showInput={items.length > limit}
        items={items}
      />
    )
  }
}

export default AutoDropdown
