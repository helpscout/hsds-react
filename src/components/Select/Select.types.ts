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
