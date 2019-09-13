export type Value = string | FieldValue

export type FieldValue = {
  value: string
  id: string
  option?: string
  validated?: boolean
  disabled?: boolean
}

export type InputFields = {
  label?: string
  name: string
  placeholder?: string
  type: FieldType
  value: Value | Value[]
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
export type FieldSize = 'md' | 'lg'
export type FieldState = 'default' | 'error' | 'warning' | 'other'

export type Validation = {
  isValid: boolean
  name: string
  value: string
  type: FieldState
  message?: string
  icon?: string
  color?: string
}

export type CommitData = {
  cause: 'BLUR' | 'ENTER' | 'OPTION_SELECTION' | 'DELETE_ACTION'
  operation: 'CREATE' | 'UPDATE' | 'DELETE'
  item: Object
}

export interface EditableFieldProps {
  actions?: FieldAction | FieldAction[] | null
  className?: string
  defaultOption: string | null
  disabled: boolean
  emphasizeTopValue: boolean
  inline: boolean
  label?: string
  multipleValues: boolean
  name: string
  placeholder?: string
  secondInput?: InputFields
  size: FieldSize
  type: FieldType
  value: Value | Value[]
  valueOptions?: string[] | Option[]
  innerRef: (node: HTMLElement) => void
  onInputFocus: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onInputBlur: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onOptionFocus: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onOptionBlur: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onOptionChange: (args: {
    name: string
    selection: string
    value: FieldValue[]
  }) => void
  onInputKeyDown: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onInputKeyPress: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onInputKeyUp: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onChange: (args: { name: string; value: FieldValue[]; event?: Event }) => void
  onEnter: (args: { name: string; value: FieldValue[]; event: Event }) => void
  onEscape: (args: { name: string; value: FieldValue[]; event: Event }) => void
  onAdd: (args: { name: string; value: FieldValue[] }) => void
  onCommit: (args: {
    name: string
    value: FieldValue[]
    data: CommitData
  }) => void
  onDelete: (args: { name: string; value: FieldValue[]; event: Event }) => void
  onDiscard: (args: { value: FieldValue[] }) => void
  validate: (args: { value: string; name: string }) => Promise<Validation>
}

export interface EditableFieldState {
  actions?: FieldAction[]
  activeField: string
  defaultOption: string | null
  disabledItem: string
  fieldValue: FieldValue[]
  initialFieldValue: FieldValue[]
  maskTabIndex: string | null
  multipleValuesEnabled: boolean
  validationInfo: Validation[]
  valueOptions: any
}

export interface InputProps {
  actions?: FieldAction[]
  className?: string
  disabled: boolean
  fieldValue: FieldValue
  inline: boolean
  isActive: boolean
  name: string
  placeholder: string
  type: FieldType
  validationInfo?: Validation
  valueOptions?: Option[]
  innerRef: (node: HTMLElement) => void
  onInputFocus: (args: { name: string; event: Event }) => void
  onInputBlur: (args: { name: string; event: Event }) => void
  onOptionFocus: (args: { name: string; event: Event }) => void
  onOptionBlur: (args: { name: string; event: Event }) => void
  onOptionSelection: (args: { name: string; selection: string }) => void
  onChange: (args: { name: string; inputValue: string; event?: Event }) => void
  onKeyDown: (args: { name: string; event: Event }) => Promise<any>
  onKeyPress: (args: { name: string; event: Event }) => void
  onKeyUp: (args: { name: string; event: Event }) => void
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

export interface MaskProps {
  actions?: FieldAction[]
  disabled: boolean
  emphasize: boolean
  fieldValue: FieldValue
  maskTabIndex: string | null
  name: string
  placeholder?: string
  type: FieldType
  validationInfo?: Validation
  valueOptions?: Option[]
  onValueKeyDown: (args: { name: string; event?: Event }) => void
}

export interface ActionsProps {
  actions: FieldAction[]
  name: string
  fieldValue: FieldValue
  validationInfo?: Validation
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

export interface TruncateProps {
  className?: string
  string: string
  splitter?: string
}

export interface CompositeProps {
  className?: string
  size: string
  separator: string
  placeholder?: string
}

export interface CompositeState {
  fields: React.ReactElement<any>[]
  hasActiveFields: boolean
  inputState: null | 'blurred' | 'focused'
  maskItems: { name: string; text: string }[]
}
