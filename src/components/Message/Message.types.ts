export type MessageType = 'action' | 'message' | ''

export type Message = {
  children?: any
  className?: string
  from?: any
  isNote?: boolean
  ltr?: boolean
  rtl?: boolean
  to?: any
  type?: MessageType
  onClick?(event: Event): void
}

export type MessageChat = Message & {
  read?: boolean
  timestamp?: string
}

export type MessageBubbleSize = 'md' | 'sm' | ''

export type MessageBubble = MessageChat & {
  body?: string
  icon?: string
  isNote?: boolean
  primary?: boolean
  title?: string
  size?: MessageBubbleSize
  typing?: boolean
}

export type MessageTheme = 'admin' | 'embed' | 'notifications' | ''

export type MessageThemeContext = {
  theme: MessageTheme
}
