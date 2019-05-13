export interface ActionSelectProps {
  animationEasing: string
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  isAutoFocusNodeOnSelect: boolean
  shouldRefocusOnClose: (...args: any[]) => boolean
  items: Array<any>
  onSelect: (item: Object, props: Object) => void
}

export interface ActionSelectContentResizerProps {
  animationEasing: string
  borderWidth: number
  children?: any
  innerRef: (node: HTMLDivElement) => void
}

export interface ActionSelectContentResizerState {
  height: number | string
}
