export interface ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionProps extends ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  options: Array<any>
  value: string
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
}
