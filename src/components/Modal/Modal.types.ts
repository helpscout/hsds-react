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
  isOpen: boolean
  containTabKeyPress: boolean
  modalAnimationDelay: number
  modalAnimationDuration: number
  modalAnimationEasing: string
  modalAnimationSequence: number | string
  modalFocusTimeout: number
  overlayAnimationDelay: number
  overlayAnimationDuration: number
  overlayAnimationEasing: string
  overlayAnimationSequence: number | string
  overlayClassName?: string
  portalIsOpen: boolean
  seamless: boolean
  style: Object
  trigger?: any
  timeout: number
  wrapperClassName?: string
  zIndex: number
}

type KeyboardEvent = Event

export type ModalBodyProps = {
  children?: any
  className?: string
  ref: (node: HTMLElement) => void
  isScrollLocked: boolean
  isSeamless: boolean
  onScroll: (event: Event) => void
  scrollable: boolean
  scrollableRef: Function
  scrollFade: boolean
}

export type ModalContentProps = {
  children?: any
  className?: string
  scrollableRef: (node: HTMLElement) => void
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
