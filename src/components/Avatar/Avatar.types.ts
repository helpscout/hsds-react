import { StatusDotStatus } from '../StatusDot/StatusDot.types'
import { AvatarShape, AvatarSize } from './Avatar.types'
import { IconSize } from '../Icon/Icon.types'

export type AvatarShape = 'square' | 'rounded' | 'circle'

export type AvatarSize = 'lg' | 'md' | 'smmd' | 'sm' | 'xs' | 'xxs' | ''

export interface AvatarProps {
  actionable?: boolean
  actionIcon?: string
  actionIconSize?: IconSize
  active?: boolean
  animation: boolean
  animationDuration: number
  animationEasing: string
  borderColor?: string
  className?: string
  count?: number | string
  fallbackImage?: string
  image?: string
  initials?: string
  light: boolean
  name: string
  onActionClick?: () => void
  onError: () => void
  onLoad: () => void
  onRemoveAnimationEnd?: () => void
  outerBorderColor?: string
  removingAvatarAnimation: boolean
  shape: AvatarShape
  showStatusBorderColor: boolean
  size: AvatarSize
  status?: StatusDotStatus
  statusIcon?: string
  style: any
  withShadow: boolean
}

export interface AvatarState {
  imageLoaded: boolean
}

export interface ImageProps {
  animation: boolean
  animationDuration: number
  animationEasing: string
  className?: string
  src?: string[] | string
  light: boolean
  name: string
  onError: () => void
  onLoad: () => void
  title: string | number
}

export interface ImageState {
  currentIndex: number
  isLoading: boolean
  isLoaded: boolean
}
