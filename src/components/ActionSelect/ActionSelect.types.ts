export interface ActionSelectBaseProps {
  animationDuration: number
  animationEasing: string
  children?: any
  className?: string
  innerRef: (node: HTMLElement) => void
  onResize: () => void
}

export interface ActionSelectProps extends ActionSelectBaseProps {
  isAutoFocusNodeOnSelect: boolean
  shouldRefocusOnClose: (...args: any[]) => boolean
  items: Array<any>
  onSelect: (item: Object, props: Object) => void
}

export interface ActionSelectContentResizerProps extends ActionSelectBaseProps {
  borderWidth: number
}

export interface ActionSelectContentResizerState {
  height: number | string
}