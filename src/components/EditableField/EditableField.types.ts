export type Value = string | string[] | FieldValue[]

export type FieldValue = {
  value: string
  id: string
  option?: string
}

export type FieldAction = {
  name: string
  icon?: string
  callback?: (args: { name: string; value: FieldValue; event: Event }) => void
}

export type Option = {
  id: string
  label: string
  value: string
}

export interface EditableFieldProps {
  actions?: FieldAction | FieldAction[]
  className?: string
  defaultOption?: string
  innerRef: (node: HTMLElement) => void
  isActive: boolean
  label: string
  name: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  value: Value
  valueOptions: string[] | Option[]
  onBlur: (args: { name: string; value: Value; event: Event }) => void
  onChange: (args: { name: string; value: Value; event: Event }) => void
  onEnter: (args: { name: string; value: Value; event: Event }) => void
  onDelete: (args: { name: string; value: Value; event: Event }) => void
  onEscape: (args: { name: string; value: Value; event: Event }) => void
  onFocus: (args: { name: string; value: Value; event: Event }) => void
}

export interface EditableFieldState {
  actions?: FieldAction[]
  activeField: string
  defaultOption?: null | string
  fieldValue: FieldValue[]
  initialFieldValue: Value
  multipleValuesEnabled: boolean
  valueOptions: any
}

export interface EditableFieldInputProps {
  actions: FieldAction[]
  className?: string
  defaultOption?: string
  fieldValue: FieldValue
  innerRef: (node: HTMLElement) => void
  isActive: boolean
  name: string
  placeholder: string
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  valueOptions: Option[]
  onActionButtonBlur: (args: { name: string; event: Event }) => Promise<any>
  onBlur: (args: { name: string; event: Event }) => Promise<any>
  onFocus: (args: { name: string; event: Event }) => Promise<any>
  onChange: (args: { name: string; inputValue: string; event: Event }) => void
  onKeyDown: (args: { name: string; event: Event }) => Promise<any>
  onOptionFocus: (args: { name: string; event: Event }) => void
  onOptionSelection: (args: { name: string; selection: string }) => void
  deleteAction: (args: {
    name: string
    action: FieldAction
    event: Event
  }) => void
  customAction: (args: {
    name: string
    action: FieldAction
    event: Event
  }) => void
}
