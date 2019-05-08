export type DropdownDirection = 'up' | 'down'

export type DropdownProps = {
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

export type DropdownState = {
  isOpen: boolean
  selectedIndex: number
}

export type DropdownItemProps = {
  children?: any
  className?: string
  disabled: boolean
  enableTabNavigation: boolean
  isHover?: boolean
  isFocused?: boolean
  isOpen?: boolean
  itemIndex: number
  itemRef: (ref: any) => void
  onBlur: (event: Event, instance: Object) => void
  onClick: (event: Event, instance: Object) => void
  onSelect: (value: any) => void
  onFocus: (event: Event, instance: Object) => void
  onMouseEnter: (event: Event, instance: Object) => void
  onMouseLeave: (event: Event, instance: Object) => void
  onMenuClose: () => void
  onParentMenuClose: () => void
  value?: any
}

export type DropdownItemState = {
  isOpen?: boolean
  isHover?: boolean
  isFocused?: boolean
}

export type DropdownMenuProps = {
  children?: any
  className?: string
  closeMenuOnClick: boolean
  forceClosePortal: boolean
  closePortal: () => void
  enableCycling: boolean
  enableTabNavigation: boolean
  isOpen: boolean
  onBeforeClose: () => void
  onBeforeOpen: () => void
  onClose: () => void
  onOpen: () => void
  onSelect: () => void
  selectedIndex: number
  trigger?: HTMLElement
}

export type DropdownMenuState = {
  focusIndex: number
  hoverIndex: number | null
}

export type DropdownTriggerProps = {
  children?: any
  className?: string
  direction: DropdownDirection
  isActive: boolean
  onClick: (event: Event) => void
}
