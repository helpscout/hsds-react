export interface EditableFieldProps {
  className?: string
  innerRef: (node: HTMLElement) => void
  isEditing: boolean
  label: string
  name: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string
  onBlur: (args: onFieldBlurArgs) => void
}

export interface EditableFieldState {
  initialValue: string | string[]
  value: string | string[]
}

export interface EditableFieldInputProps {
  className?: string
  innerRef: (node: HTMLElement) => void
  name: string
  placeholder: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: string
  onBlur: (args: onBlurArgs) => void
  onChange: (args: onChangeArgs) => void
  onKeyDown: (args: onKeyDownArgs) => void
}

export interface EditableFieldInputState {
  isEditing: boolean
}

type onBlurArgs = {
  name: string
  e: Event
}

type onFieldBlurArgs = {
  value: string | string[]
  name: string
  e: Event
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
