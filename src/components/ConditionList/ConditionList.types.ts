export interface ConditionListProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  isAddEnabled: boolean
  isWithOffset: boolean
  onAdd: (event: Event) => void
}
