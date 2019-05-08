import { UIState } from '../../constants/types'
import { DropdownProps } from '../Dropdown/V2/Dropdown.types'

export interface SelectDropdownProps extends DropdownProps {
  onChange: (...args: any) => void
  errorIcon: string
  errorMessage?: string
  isFocused: boolean
  placeholder: string
  state?: UIState
  value?: any
}
export interface SelectDropdownState {
  isFocused: boolean
  selectedItem: any
}
