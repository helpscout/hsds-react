import { DropdownProps } from '../Dropdown/V2/Dropdown.types'

export interface ActionSelectBaseProps {
  animationDuration: number
  animationEasing: string
  children?: any
  className?: string
  innerRef: (node: HTMLElement) => void
  isFadeContentOnOpen: boolean
  onResize: () => void
  selectedKey?: string
}

export interface ActionSelectProps
  extends ActionSelectBaseProps,
    DropdownProps {
  children?: any
  isAutoFocusNodeOnSelect: boolean
  shouldRefocusOnClose: (...args: any[]) => boolean
  items: Array<any>
  onSelect: (item: Object, props: Object) => void
}

export interface ActionSelectState {
  isOpen: boolean
  selectedItem?: any
}

export interface ActionSelectContentResizerProps extends ActionSelectBaseProps {
  borderWidth: number
  isOpen: boolean
}

export interface ActionSelectContentResizerState {
  height: number | string
}
