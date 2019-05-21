export interface ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
}
