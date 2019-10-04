export type InputNode = HTMLInputElement
export type InputEvent = Event

export type RadioCardProps = {
  checked: boolean
  className?: string
  content: string | Component
  heading?: string
  icon: string | Component
  iconSize: number
  id?: string
  innerRef: (node: InputNode) => void
  inputRef: (node: InputNode) => void
  isFocused: boolean
  maxWidth?: string | number
  onBlur: (event: InputEvent) => void
  onChange: (value: any) => void
  onFocus: (event: InputEvent) => void
  title?: string
  value?: string
}

export type RadioCardState = {
  id: string
  isFocused: boolean
}
