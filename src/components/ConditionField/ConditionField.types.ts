export interface ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
  isWithOr: boolean
  onRemove: () => void
  removeTitle: string
  tooltipDelay: number
  tooltipDuration: number
}

export interface ConditionFieldGroupProps extends ConditionBaseProps {
  isAddEnabled: boolean
  onAdd: (event: Event) => void
}
