export interface EditableFieldProps {
  className?: string
  innerRef: (node: HTMLElement) => void
  isEditing: boolean
  label: string
  name: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string
}

export interface EditableFieldState {
  initialValue: string | string[]
  value: string | string[]
}

export interface EditableFieldInputProps {
  className?: string
  innerRef: (node: HTMLElement) => void
  name: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string
  onBlur: () => void
  onChange: (args: onChangeArgs) => void
  onKeyDown: (args: onKeyDownArgs) => void
}

export interface EditableFieldInputState {
  isEditing: boolean
}

type onChangeArgs = {
  inputValue: string
  name: string
}

type onKeyDownArgs = {
  e: Event
  spanNode: HTMLElement
  name: string
}
