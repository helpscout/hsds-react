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
  defaultOption: string | null
  disabled: boolean
  label?: string
  emphasizeTopValue: boolean
  multipleValues: boolean
  name: string
  placeholder?: string
  renderFieldsAsBlocks: boolean
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
  defaultOption: string | null
  fieldValue: FieldValue[]
  focusedByLabel: boolean
  initialFieldValue: FieldValue[]
  multipleValuesEnabled: boolean
  valueOptions: any
}

export interface EditableFieldInputProps {
  actions?: FieldAction[]
  className?: string
  disabled: boolean
  emphasize: boolean
  fieldValue: FieldValue
  isActive: boolean
  name: string
  placeholder: string
  renderAsBlock: boolean
  type: 'text' | 'email' | 'url' | 'tel' | 'number' | 'textarea'
  valueOptions?: Option[]
  innerRef: (node: HTMLElement) => void
  onInputFocus: (args: { name: string; event: Event }) => Promise<any>
  onInputBlur: (args: { name: string; event: Event }) => void
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

export interface EditableFieldInputState {
  dynamicFieldWidth: string | null
  staticContentWidth: string | null
}

export interface TruncateProps {
  string: string
  splitter?: string
}
