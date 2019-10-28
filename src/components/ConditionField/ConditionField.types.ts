export interface ConditionBaseProps {
  className?: string
  children?: any
  ref: (node: HTMLElement) => void
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
  isWithOr: boolean
  isWithRemove: boolean
  onRemove: () => void
  removeTitle: string
  tooltipDelay: number
  tooltipDuration: number
}

export interface ConditionFieldGroupProps extends ConditionBaseProps {
  isAddEnabled: boolean
  onAdd: (event: Event) => void
}
