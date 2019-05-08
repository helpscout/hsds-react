export interface SideNavigationProps {
  className?: string
  width?: number
  collapsable?: boolean
  collapsed?: boolean
  floatingMenu?: boolean
}
export interface SideNavigationState {
  dropdowns: string[]
}

export interface SideNavigationButtonProps {
  className?: string
  floatingMenu?: boolean
  iconName?: string
  icon?: Element
}

export interface SideNavigationDropdownFooterProps {
  className?: string
  items: Array<any>
  selectedItem: any
  floatingMenu?: boolean
  iconName: string
  forceNavVisibleOn(id: string)
  forceNavVisibleOff(id: string)
}

export interface SideNavigationDropdownHeaderProps {
  className?: string
  items: Array<any>
  selectedItem: any
  forceNavVisibleOn(id: string)
  forceNavVisibleOff(id: string)
}

export interface SideNavigationFadeInOutProps {
  className?: string
  collapsable?: boolean
}

export interface SideNavigationFooterProps {
  className?: string
  collapsable?: boolean
  collapsed?: boolean
  floatingMenu?: boolean
}

export interface SideNavigationHeaderProps {
  badge?: string
  collapsable?: boolean
  className?: string
  href?: string
  label?: string
}

export interface SideNavigationHeadingProps {
  className?: string
}

export interface SideNavigationItemProps {
  className?: string
  collapsed?: boolean
  href?: string
  iconName?: string
  count?: number
  active?: boolean
  danger?: boolean
  muted?: boolean
  disabled?: boolean
  onClick: (event: Event) => void
}

export interface SideNavigationSectionProps {
  className?: string
  title?: string
  withPadding?: boolean
}
