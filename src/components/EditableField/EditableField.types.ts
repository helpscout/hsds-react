export type ValueObj = {
  value: string
  id: string
}

export type Value = string | string[] | ValueObj[]

export interface EditableFieldProps {
  actions?: any
  className?: string
  innerRef: (node: HTMLElement) => void
  isEditing: boolean
  label: string
  name: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string | string[]
  onInputBlur: (args: { name: string; value: Value; event: Event }) => void
  onFieldBlur: (args: { name: string; value: Value; event: Event }) => void
  onChange: (args: { name: string; value: Value; event: Event }) => void
  onEnter: (args: { name: string; value: Value; event: Event }) => void
  onDelete: (args: { name: string; value: Value; event: Event }) => void
  onEscape: (args: { name: string; value: Value; event: Event }) => void
  onFocus: (args: { name: string; value: Value; event: Event }) => void
}

export interface EditableFieldState {
  initialValue: Value
  value: Value
  editingField: string
}

export interface EditableFieldInputProps {
  actions?: any
  className?: string
  innerRef: (node: HTMLElement) => void
  name: string
  isEditing: boolean
  placeholder: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string
  onActionButtonBlur: (args: { name: string; event: Event }) => Promise<any>
  onBlur: (args: { name: string; event: Event }) => void
  onDelete: (args: { name: string; event: Event }) => Promise<any>
  onFocus: (args: { name: string; event: Event }) => Promise<any>
  onChange: (args: { name: string; inputValue: string; event: Event }) => void
  onKeyDown: (args: { name: string; event: Event }) => Promise<any>
}
