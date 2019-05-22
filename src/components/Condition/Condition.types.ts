export interface ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionProps extends ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  isWithAnd: boolean
  options: Array<any>
  onChange: (value: any) => void
  value: string
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
}
