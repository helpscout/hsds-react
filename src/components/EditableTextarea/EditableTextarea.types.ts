import {
  CommitData,
  FieldValue,
  Validation,
} from '../EditableField/EditableField.types'

export interface EditableTextareaProps {
  className?: string
  floatingLabels: boolean
  id: string
  label: string
  maxRows: number
  innerRef: (node: HTMLElement) => void
  overflowCueColor: string
  placeholder: string
  value: string
  onCommit: (args: {
    name: string
    value: FieldValue[]
    data: CommitData
  }) => void
  onChange: (args: { name: string; value: FieldValue[]; event?: Event }) => void
  onInputBlur: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onInputFocus: (args: {
    name: string
    value: FieldValue[]
    event: Event
  }) => void
  onEnter: (args: { name: string; value: FieldValue[]; event: Event }) => void
  onEscape: (args: { name: string; value: FieldValue[]; event: Event }) => void
  validate: (args: {
    data: CommitData
    name: string
    value: string
    values: FieldValue[]
  }) => Promise<Validation>
}

export interface EditableTextareaState {
  clamped: boolean
  prevValue: string
  readOnly: boolean
  value: string
  validated: boolean
  validationInfo: Validation | null
}
