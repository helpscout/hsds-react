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
  children?: (props: any) => void
  className?: string
  closeDropdown: () => void
  id?: string
  onBlur: (event: Event) => void
  onFocus: (event: Event) => void
  onOpen: () => void
  onClose: () => void
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  itemOnMouseEnter: (event: Event) => void
  itemOnFocus: (event: Event) => void
  itemOnClick: (event: Event) => void
  direction: 'left' | 'right'
  dropUp: boolean
  onSelect: (item: Object, props: Object) => void
  menuId?: string
  menuRef: (node: HTMLElement) => void
  renderItem?: any
  renderTrigger?: any
  trigger: any
  triggerRef: (node: HTMLElement) => void
  selectedItem?: string | Object
  setMenuNode: (node: HTMLElement) => void
  setTriggerNode: (node: HTMLElement) => void
}

export type ItemIndex = string
