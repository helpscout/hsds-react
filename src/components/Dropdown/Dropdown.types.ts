export type DropdownDirection = 'up' | 'down'

export interface DropdownProps {
  children?: any
  className?: string
  closeMenuOnClick: boolean
  direction: DropdownDirection
  enableTabNavigation: boolean
  isOpen: boolean
  onClose: () => void
  onSelect: () => void
  selectedIndex: number
}

export interface DropdownState {
  isOpen: boolean
  selectedIndex: number
}

export interface DropdownItemProps {
  children?: any
  className?: string
  disabled: boolean
  enableTabNavigation: boolean
  isHover?: boolean
  isFocused?: boolean
  isOpen?: boolean
  itemIndex: number
  itemRef: (ref: any) => void
  onBlur: (...args: any[]) => void
  onClick: (...args: any[]) => void
  onSelect: (value: any) => void
  onFocus: (...args: any[]) => void
  onMouseEnter: (...args: any[]) => void
  onMouseLeave: (...args: any[]) => void
  onMenuClose: () => void
  onParentMenuClose: () => void
  value?: any
}

export interface DropdownItemState {
  isOpen?: boolean
  isHover?: boolean
  isFocused?: boolean
}
