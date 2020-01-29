export interface SortableProps {
  axis?: 'x' | 'y' | 'xy'
  className?: string
  distance?: number
  lockAxis?: string
  helperClass?: string
  hideDragHandles?: boolean
  transitionDuration?: number
  contentWindow?: any
  onSortStart?: () => void
  onSortMove?: () => void
  onSortEnd?: (...args: any[]) => void
  shouldCancelStart?: () => void
  pressDelay?: number
  useDragHandle?: boolean
  useWindowAsScrollContainer?: boolean
  hideSortableGhost?: boolean
  lockToContainerEdges?: boolean
  lockOffset?: number | string | Array<string | number>
  getContainer?: () => void
  getHelperDimensions?: () => void
}
