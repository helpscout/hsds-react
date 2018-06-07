// @flow
export type MessageType = 'action' | 'message' | ''

export type Message = {
  children?: any,
  className?: string,
  from?: any,
  ltr?: boolean,
  rtl?: boolean,
  to?: any,
  type?: MessageType,
}

export type Chat = Message & {
  read?: boolean,
  timestamp?: string
}


export type Theme = 'admin' | 'embed' | 'notifications' | ''

export type ThemeContext = {
  theme: Theme
}