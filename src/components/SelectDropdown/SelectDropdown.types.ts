import { UIState } from '../../constants/types'
import { DropdownProps } from '../Dropdown/Dropdown.types'

export interface SelectDropdownProps extends DropdownProps {
  autoInput?: boolean
  errorIcon: string
  errorMessage?: string
  isFocused: boolean
  limit?: number
  onChange: (...args: any) => void
  placeholder: string
  state?: UIState
  value?: any
}
export interface SelectDropdownState {
  isFocused: boolean
  selectedItem: any
}
