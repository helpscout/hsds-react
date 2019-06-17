export interface EditableFieldProps {
  className?: string
  innerRef: (node: HTMLElement) => void
  isEditing: boolean
  label: string
  name: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string
  onInputBlur: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
  onFieldBlur: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
  onChange: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
  onEnter: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
  onDelete: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
  onEscape: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
  onFocus: (args: {
    name: string
    value: string | string[]
    event: Event
  }) => void
}

export interface EditableFieldState {
  initialValue: string | string[]
  value: string | string[]
  editingField: string
}

export interface EditableFieldInputProps {
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
