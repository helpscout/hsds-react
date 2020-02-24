import { PortalProps } from '../Portal/Portal.types'
import { ToolbarSize } from '../Toolbar/Toolbar.types'

export interface ModalProps extends PortalProps {
  cardClassName?: string
  children?: any
  className?: string
  closeIcon: boolean
  forceClosePortal: () => void
  closeIconRepositionDelay: number
  closeIconOffset: number
  closePortal: () => void
  containTabKeyPress: boolean
  description?: string
  isOpen: boolean
  kind?: string
  icon?: string
  illo?: any
  illoSize?: number
  modalAnimationDelay: number
  modalAnimationDuration: number
  modalAnimationEasing: string
  modalAnimationSequence: number | string
  modalFocusTimeout: number
  numSteps?: number
  overlayAnimationDelay: number
  overlayAnimationDuration: number
  overlayAnimationEasing: string
  overlayAnimationSequence: number | string
  overlayClassName?: string
  portalIsOpen: boolean
  seamless: boolean
  state?: string
  step?: number
  style: Object
  title?: string
  trigger?: any
  timeout: number
  version?: number
  wrapperClassName?: string
  zIndex: number
}

type KeyboardEvent = Event

export type ModalBodyProps = {
  children?: any
  className?: string
  innerRef: (node: HTMLElement) => void
  isScrollLocked: boolean
  isSeamless: boolean
  kind?: string
  onScroll: (event: Event) => void
  scrollable: boolean
  scrollableRef: Function
  scrollFade: boolean
  version?: number
}

export type ModalContentProps = {
  children?: any
  className?: string
  scrollableRef: (node: HTMLElement) => void
}

export type ModalActionFooterProps = {
  children?: any
  className?: string
  cancelText?: string
  kind?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  showDefaultCancel?: boolean
  state?: string
  onCancel?: () => void
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export type ModalFooterProps = {
  children?: any
  className?: string
  seamless: boolean
  shadow: boolean
  size: ToolbarSize
}

export type ModalHeaderProps = {
  children?: any
  className?: string
  seamless: boolean
  shadow: boolean
  size: ToolbarSize
}

export type ModalHeaderV2Props = {
  children?: any
  className?: string
  description?: string
  icon?: string
  illo?: any
  illoSize?: number
  kind?: string
  numSteps?: number
  step?: number
  title?: string
}

export type ModalOverlayProps = {
  children?: any
  className?: string
  onClick: () => void
  isOpen: boolean
  overlayAnimationDelay: number
  overlayAnimationDuration: number
  overlayAnimationEasing: string
  overlayAnimationSequence: any
}
