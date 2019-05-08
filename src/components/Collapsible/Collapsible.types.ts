export interface CollapsibleProps {
  children?: any
  className?: string
  duration?: number
  durationOpen?: number
  durationClose?: number
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  style?: Object
}

export interface CollapsibleState {
  animationState: string
  height: number
}
