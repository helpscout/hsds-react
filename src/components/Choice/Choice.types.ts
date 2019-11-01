import { UIState } from '../../constants/types'

export type ChoiceAlign = 'top' | ''
export type ChoiceType = 'checkbox' | 'radio'
export type ChoiceValue = string | number | boolean

export interface ChoiceProps {
  align: ChoiceAlign
  autoFocus: boolean
  children?: any
  checked: boolean
  className?: string
  componentID: string
  disabled: boolean
  helpText?: string
  hideLabel: boolean
  id?: string
  isBlock: boolean
  inputRef: (node: HTMLElement) => void
  innerRef: (node: HTMLElement) => void
  kind?: string
  label?: string
  onBlur: (event: Event) => void
  onChange: (event: Event, checked: boolean) => void
  onFocus: (event: Event) => void
  name?: string
  readOnly: boolean
  stacked: boolean
  state?: UIState
  type: ChoiceType
  value: ChoiceValue
}

export interface ChoiceState {
  checked: boolean
  id: string
}
