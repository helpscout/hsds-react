export type InputNode = HTMLInputElement
export type InputEvent = Event

export type RadioCardProps = {
  checked: boolean
  className?: string
  content?: string | Component | React.ReactNode
  heading?: string | Component | React.ReactNode
  icon: string | Component | React.ReactNode
  iconSize: number
  id?: string
  ref: (node: InputNode) => void
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
