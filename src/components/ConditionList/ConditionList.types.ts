export interface ConditionListProps {
  className?: string
  children?: any
  conditions: Array<any>
  innerRef: (node: HTMLElement) => void
  isAddEnabled: boolean
  onAdd: (event: Event) => void
}
