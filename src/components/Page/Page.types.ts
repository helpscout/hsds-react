export type ActionsDirection = 'left' | 'right'

export interface PageProps {
  children?: any
  className?: string
  isResponsive: boolean
}

export interface PageActionsProps {
  className?: string
  direction?: ActionsDirection
  innerRef: (node: HTMLDivElement) => void
  isResponsive: boolean
  isSticky: boolean
  onStickyStart: (ndoe: HTMLElement) => void
  onStickyEnd: (ndoe: HTMLElement) => void
  primary?: any
  secondary?: any
  serious?: any
  zIndex: number
}

export interface PageActionsState {
  isStickyActive: boolean
}

export interface PageStickyActionsProps {
  classNames?: string
  children?: React.ReactNode
  innerRef: (node: HTMLElement) => void
  onStickyStart: (ndoe: HTMLElement) => void
  onStickyEnd: (ndoe: HTMLElement) => void
}

export interface PageStickyActionsState {
  isSticky: boolean
}

export interface PageCardProps {
  children?: any
  className?: string
}

export interface PageContentProps {
  children?: any
  className?: string
  isResponsive: boolean
}

export interface PageHeaderProps {
  children?: any
  className?: string
  isResponsive: boolean
  render?: any
  title?: string
  subtitle?: string
  withBorder: boolean
  withBottomMargin: boolean
}

export interface PageSectionProps {
  children?: any
  className?: string
  isResponsive?: boolean
}
