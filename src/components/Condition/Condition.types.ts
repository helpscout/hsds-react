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

export interface ConditionAddButtonProps extends ConditionBaseProps {
  onClick: (event: Event) => void
  isBorderless: boolean
  scrollDuration: number
  scrollOffset: number
  type: 'and' | 'or'
}
