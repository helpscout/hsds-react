import { UISize, UIState } from '../../constants/types'

export type SelectValue = string

export type Option = {
  disabled: boolean
  label: string
  value: SelectValue
}

export type SelectOption = Option | SelectValue
export type SelectOptions = Array<SelectOption>

export type SelectGroup = {
  label: string
  value: SelectOptions
}

export type SelectEvent = Event
export type SelectOptionProp =
  | SelectGroup
  | SelectOptions
  | SelectOption
  // | Array<any>
  | string

export type SelectProps = {
  autoFocus: boolean
  children?: any
  className: string
  disabled: boolean
  errorIcon: string
  errorMessage: string
  forceAutoFocusTimeout: number
  helpText: any
  hintText: any
  id: string
  ref: (node: HTMLElement) => void
  isFocused: boolean
  isFirst: boolean
  isNotOnly: boolean
  isLast: boolean
  label: any
  name: string
  options: SelectOptionProp
  onBlur: (event: SelectEvent) => void
  onChange: (value: SelectValue) => void
  onFocus: (event: SelectEvent) => void
  placeholder: string
  prefix: string
  removeStateStylesOnFocus: boolean
  seamless: boolean
  style?: Object
  size: UISize
  state?: UIState
  success: boolean
  value: string
  width: number | string
}

export type SelectState = {
  id?: string
  isFocused: boolean
  state?: UIState
  value: SelectValue
}

export interface SelectArrowProps {
  className?: string
  state?: UIState
}
