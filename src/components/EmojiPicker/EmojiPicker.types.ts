export interface EmojiProps {
  colons: string
  hoverBackgroundColor: string
  name: string
  symbol: string
  unified: string
  value: string
}

export interface EmojiPickerProps {
  className?: string
  emojiSet?: Array<EmojiProps>
  innerRef: (node: HTMLElement) => void
  onSelect: (item: Object, props: Object) => void
  renderItem?: any
  renderMenu?: any
  size?: string
  renderTrigger?: any
}
