import { CommitData, FieldValue } from '../EditableField/EditableField.types'

export interface EditableTextareaProps {
  className?: string
  id: string
  maxRows: number
  innerRef: (node: HTMLElement) => void
  placeholder: string
  value: string
  onCommit: (args: {
    name: string
    value: FieldValue[]
    data: CommitData
  }) => void
  onChange: (args: { name: string; value: FieldValue[]; event?: Event }) => void
  onEnter: (args: { name: string; value: FieldValue[]; event: Event }) => void
  onEscape: (args: { name: string; value: FieldValue[]; event: Event }) => void
}

export interface EditableTextareaState {
  clamped: boolean
  prevValue: string
  readOnly: boolean
  value: string
}
