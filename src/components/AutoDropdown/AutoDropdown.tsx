import * as React from 'react'
import ComboBox from '../ComboBox'
import propConnect from '../PropProvider/propConnect'
import { DropdownProps } from '../Dropdown/V2/Dropdown.types'
import { initialState } from '../Dropdown/V2/Dropdown.store'
import { COMPONENT_KEY } from './AutoDropdown.utils'

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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(AutoDropdown)

export default PropConnectedComponent
