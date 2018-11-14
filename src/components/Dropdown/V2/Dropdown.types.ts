export interface DropdownState {
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
  renderItems?: any
  renderTrigger?: any
}

export type ItemIndex = string
