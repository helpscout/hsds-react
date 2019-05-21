export interface ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export interface ConditionProps extends ConditionBaseProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  isMultiCondition: boolean
  options: Array<any>
  selectedItem: any
}

export interface ConditionFieldProps extends ConditionBaseProps {
  closeIcon: string
}
