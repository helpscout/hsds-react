export interface ActionSelectBaseProps {
  animationEasing: string
  animationDuration: number
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
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
