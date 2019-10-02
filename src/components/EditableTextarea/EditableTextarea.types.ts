export interface EditableTextareaProps {
  className?: string
  children?: any
  maxRows: number
  innerRef: (node: HTMLElement) => void
  placeholder: string
  value: string
}

export interface EditableTextareaState {
  readOnly: boolean
  value: string
  prevValue: string
  clamped: boolean
}
