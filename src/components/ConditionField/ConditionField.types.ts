export interface ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
  onRemove: () => void
  removeTitle: string
}

export interface ConditionFieldGroupProps extends ConditionBaseProps {
  isAddEnabled: boolean
  onAdd: (event: Event) => void
}
