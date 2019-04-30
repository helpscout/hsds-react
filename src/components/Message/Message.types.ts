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

export type themeTypes = 'admin' | 'embed' | 'notifications' | ''

export type typeTypes = 'action' | 'message' | ''

export type providerContextTypes = {
  theme: themeTypes
}

export interface messageTypes {
  from: Node | boolean
  ltr: boolean
  rtl: boolean
  to: Node | boolean
  type: typeTypes
}

export interface chatTypes extends messageTypes {
  read: boolean
  timestamp: string
}

export interface bubbleTypes extends chatTypes {
  body: string
  icon: string
  isNote: boolean
  primary: boolean
  title: string
  size: 'md' | 'sm' | ''
  typing: boolean
}
