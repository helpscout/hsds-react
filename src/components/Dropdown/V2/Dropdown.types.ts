export interface DropdownMenuDimensions {
  maxHeight: number
  maxWidth: number
  minHeight: number
  minWidth: number
}

export interface DropdownState extends DropdownMenuDimensions {
  activeItem?: HTMLElement | null
  activeIndex?: string
  activeId?: string
  closeOnSelect: boolean
  id?: string
  menuId?: string
  triggerId?: string
  isOpen: boolean
  items: Array<any>
  direction: 'left' | 'right'
  dropUp: boolean
  onOpen: () => void
  onClose: () => void
  onSelect: (item: Object, props: Object) => void
  renderItem?: any
  renderTrigger?: any
}

export interface DropdownProps extends DropdownMenuDimensions {
  activeClassName: string
  children?: (props: any) => void
  className?: string
  closeOnSelect: boolean
  clearOnSelect: boolean
  closeDropdown: () => void
  direction: 'left' | 'right'
  dropUp: boolean
  enableTabNavigation: boolean
  envNode: any
  focusClassName: string
  id?: string
  index?: string
  innerRef: (node: HTMLElement) => void
  inputValue: string
  isLoading: boolean
  isOpen: boolean
  items: Array<any>
  menuId?: string
  menuRef: (node: HTMLElement) => void
  onBlur: (...args: any[]) => void
  onClose: () => void
  onFocus: (...args: any[]) => void
  onMenuMount: () => void
  onMenuUnmount: () => void
  onOpen: () => void
  onSelect: (item: Object, props: Object) => void
  openClassName: string
  previousIndex?: null
  previousSelectedIndex?: string
  renderEmpty?: any
  renderItem?: any
  renderLoading?: any
  renderTrigger?: any
  selectedIndex?: string
  selectedItem?: string | Object
  setMenuNode: (node: HTMLElement) => void
  setTriggerNode: (node: HTMLElement) => void
  stateReducer: (...args: any[]) => void
  trigger: any
  triggerRef: (node: HTMLElement) => void
  withScrollLock: boolean
}

export type ItemIndex = string
