export interface DropdownMenuDimensions {
  maxHeight: number | string
  maxWidth: number | string
  minHeight: number | string
  minWidth: number | string
  width?: number | string
}

export interface DropdownState extends DropdownMenuDimensions {
  closeOnSelect: boolean
  direction: 'left' | 'right'
  dropUp: boolean
  id?: string
  isOpen: boolean
  items: Array<any>
  menuId?: string
  onClose: () => void
  onOpen: () => void
  onSelect: (item: Object, props: Object) => void
  renderItem?: any
  renderTrigger?: any
  triggerId?: string
}

export interface DropdownProps extends DropdownMenuDimensions {
  activeClassName: string
  children?: (props: any) => void
  className?: string
  clearOnSelect: boolean
  closeDropdown: () => void
  closeOnSelect: boolean
  direction: 'left' | 'right'
  disabled: boolean
  dropUp: boolean
  enableTabNavigation: boolean
  envNode: any
  focusClassName: string
  forceDropDown: boolean
  getState: (...args: any[]) => void
  id?: string
  index?: string
  innerRef: (node: HTMLElement) => void
  inputValue: string
  isLoading: boolean
  isOpen: boolean
  items: Array<any>
  menuId?: string
  menuOffsetTop: number
  menuRef: (node: HTMLElement) => void
  onBlur: (...args: any[]) => void
  onClose: () => void
  onFocus: (...args: any[]) => void
  onMenuMount: () => void
  onMenuUnmount: () => void
  onOpen: () => void
  onSelect: (item: Object, props: Object) => void
  openClassName: string
  positionFixed: boolean
  previousIndex?: null
  renderEmpty?: any
  renderItem?: any
  renderLoading?: any
  renderTrigger?: any
  selectedItem?: string | Object
  setMenuNode: (node: HTMLElement) => void
  setTriggerNode: (node: HTMLElement) => void
  shouldDropDirectionUpdate: (Position: any) => boolean
  stateReducer: (...args: any[]) => void
  trigger: any
  triggerRef: (node: HTMLElement) => void
  triggerStyle: any
  withScrollLock: boolean
}

export type ItemIndex = string
