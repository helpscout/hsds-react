export type Value = string | string[] | FieldValue | FieldValue[]

export type FieldValue = {
  value: string
  id?: string
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

export type FieldType = 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'

export interface EditableFieldProps {
  actions?: FieldAction | FieldAction[] | null
  className?: string
  defaultOption?: string
  label?: string
  multipleValues: boolean
  name: string
  placeholder?: string
  type: FieldType
  value: Value
  valueOptions?: string[] | Option[]
  innerRef: (node: HTMLElement) => void
  onInputFocus: (args: { name: string; value: Value; event: Event }) => void
  onInputBlur: (args: { name: string; value: Value; event: Event }) => void
  onInputChange: (args: { name: string; value: Value; event: Event }) => void
  onOptionFocus: (args: { name: string; value: Value; event: Event }) => void
  onOptionChange: (args: {
    name: string
    selection: string
    value: Value
  }) => void
  onChange: (args: { name: string; value: Value; event?: Event }) => void
  onEnter: (args: { name: string; value: Value; event: Event }) => void
  onEscape: (args: { name: string; value: Value; event: Event }) => void
  onAdd: (args: { name: string; value: Value }) => void
  onCommit: (args: { name: string; value: Value }) => void
  onDelete: (args: { name: string; value: Value; event: Event }) => void
  onDiscard: (args: { value: Value }) => void
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
  onInputFocus: (args: { name: string; event: Event }) => Promise<any>
  onInputBlur: (args: { name: string; event: Event }) => Promise<any>
  onInputChange: (args: {
    name: string
    inputValue: string
    event: Event
  }) => void
  onOptionFocus: (args: { name: string; event: Event }) => void
  onOptionSelection: (args: { name: string; selection: string }) => void
  onChange: (args: { name: string; inputValue: string; event?: Event }) => void
  onKeyDown: (args: { name: string; event: Event }) => Promise<any>
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
