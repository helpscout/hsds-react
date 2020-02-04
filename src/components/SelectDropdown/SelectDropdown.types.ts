import { UIState } from '../../constants/types'
import { DropdownProps } from '../dropdown/Dropdown.types'

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
