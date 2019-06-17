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
  enableLeftRightArrowNavigation: boolean
  emojiSet?: Array<EmojiProps>
  innerRef: (node: HTMLElement) => void
  onSelect: (item: Object, props: Object) => void
  renderItem?: any
  renderMenu?: any
  size?: string
  renderTrigger?: any
}

export interface EmojiPickerMenuProps {
  className?: string
  items: Array<EmojiProps>
  renderItem?: any
  renderMenu?: any
  size: string
}

export interface EmojiPickerItemProps {
  className: any
  hoverBackgroundColor: string
  name: string
  renderItem?: any
  size: string
  symbol?: string
}
