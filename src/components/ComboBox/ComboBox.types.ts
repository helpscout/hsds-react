import { DropdownProps } from '../Dropdown/V2/Dropdown.types'

export interface ComboBoxProps extends DropdownProps {
  closeOnInputTab: boolean
  customFilter?: (filterProps: Object, defaultFilter: any) => void
  onInputChange: (value: string) => void
  inputProps: any
  itemFilterKey: string
  noResultsLabel: string
  renderMenuStart?: () => void
  renderMenuEnd?: () => void
  renderFooter?: () => void
  showInput: boolean
}

export interface ComboBoxState {
  inputValue: string
  isOpen: boolean
}
