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
  onBlur: (event: Event, reactEvent: Event, instance: Object) => void
  onClick: (event: Event, reactEvent: Event, instance: Object) => void
  onSelect: (value: any) => void
  onFocus: (event: Event, reactEvent: Event, instance: Object) => void
  onMouseEnter: (event: Event, reactEvent: Event, instance: Object) => void
  onMouseLeave: (event: Event, reactEvent: Event, instance: Object) => void
  onMenuClose: () => void
  onParentMenuClose: () => void
  value?: any
}

export interface DropdownItemState {
  isOpen?: boolean
  isHover?: boolean
  isFocused?: boolean
}
