export type WidthValue = number | string | null | undefined

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

export interface DropdownMenuContainerProps {
  allowMultipleSelection?: boolean
  animationDuration: number
  animationSequence: string
  children?: (props: any) => void
  className?: string
  clearSelection: (...args: any[]) => void
  closeDropdown: () => void
  contentWindow: any
  dropRight: boolean
  dropUp: boolean
  forceDropDown: boolean
  focusItem: (...args: any[]) => void
  getState: (...args: any[]) => void
  id?: string
  innerRef: (node) => void
  isLoading: boolean
  isOpen: boolean
  items: Array<any>
  menuOffsetTop: number
  onMenuMounted: () => void
  onMenuReposition: (props: any) => void
  onMenuUnmounted: () => void
  positionFixed: boolean
  renderEmpty?: any
  renderLoading?: any
  selectItem: (...args: any[]) => void
  selectionClearer?: string
  shouldDropDirectionUpdate: (Position: any) => boolean
  shouldRefocusOnClose: (...args: any[]) => boolean
  triggerId?: string
  triggerNode?: HTMLElement
  zIndex: number
}

export interface DropdownProps extends DropdownMenuDimensions {
  activeClassName: string
  allowMultipleSelection: boolean
  cardBorderColor?: string
  children?: (props: any) => void
  className?: string
  clearOnSelect: boolean
  closeDropdown: () => void
  closeOnSelect: boolean
  contentWindow: any
  direction: 'left' | 'right'
  disabled: boolean
  dropUp: boolean
  enableLeftRightArrowNavigation: boolean
  enableTabNavigation: boolean
  envNode: any
  focusClassName: string
  forceDropDown: boolean
  getState: (...args: any[]) => void
  id?: string
  index?: string
  innerRef: (node) => void
  inputValue: string
  isLoading: boolean
  isOpen: boolean
  isFocusSelectedItemOnOpen: boolean
  isSelectFirstItemOnOpen: boolean
  items: Array<any>
  label?: string
  menuId?: string
  menuOffsetTop: number
  menuRef: (node) => void
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
  selectionClearer?: string
  setMenuNode: (node) => void
  setTriggerNode: (node) => void
  shouldDropDirectionUpdate: (Position: any) => boolean
  stateReducer: (...args: any[]) => void
  trigger: any
  triggerRef: (node) => void
  triggerStyle: any
  withScrollLock: boolean
}

export interface DropdownCardProps {
  borderColor?: string
  className?: string
  children?: any
  innerRef: (node) => void
  minWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  width?: WidthValue
  triggerNode?: HTMLElement
  style: Object
}

export type ItemIndex = string
