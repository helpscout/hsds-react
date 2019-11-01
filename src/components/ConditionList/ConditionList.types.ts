export interface ConditionListBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionListProps extends ConditionListBaseProps {
  isAddEnabled: boolean
  isWithOffset: boolean
  onAdd: (event: Event) => void
  scrollDuration: number
  scrollOffset: number
}

export interface ConditionListAddButtonProps extends ConditionListBaseProps {
  onClick: (event: Event) => void
  scrollDuration: number
  scrollOffset: number
}
