export type InputNode = HTMLInputElement
export type InputEvent = Event

export type RadioCardProps = {
  checked: boolean
  className?: string
  icon: string | Component
  iconSize: number
  id?: string
  inputRef: (node: InputNode) => void
  innerRef: (node: InputNode) => void
  isFocused: boolean
  onBlur: (event: InputEvent) => void
  onFocus: (event: InputEvent) => void
  title?: string
  onChange: (value: any) => void
  value?: string
}

export type RadioCardState = {
  id: string
  isFocused: boolean
}
