export type ActionsDirection = 'left' | 'right'

export interface PageProps {
  children?: any
  className?: string
  isResponsive: boolean
}

export interface PageActionsProps {
  className?: string
  direction?: ActionsDirection
  primary?: any
  secondary?: any
  serious?: any
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
