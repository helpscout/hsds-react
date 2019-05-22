export interface ConditionListProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  isAddEnabled: boolean
  onAdd: (event: Event) => void
}
