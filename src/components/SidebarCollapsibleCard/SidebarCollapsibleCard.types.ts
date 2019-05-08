import { CollapsibleProps } from '../Collapsible/Collapsible.types'

export interface SidebarCollapsibleCardProps extends CollapsibleProps {
  header: HTMLElement
  title: string
  isOpen: boolean
  sortable: boolean
  onSortStart: () => void
  onSortEnd: () => void
}

export interface SidebarCollapsibleCardState {
  isOpen: boolean
  id: string
}
