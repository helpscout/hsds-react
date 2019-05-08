export interface TruncateProps {
  children?: any
  className?: string
  ellipsis?: string
  limit: number
  end?: number
  start?: number
  showTooltipOnTruncate: boolean
  text?: string
  title?: string
  tooltipProps: Object
  tooltipPlacement: string
  tooltipModifiers: Object
  type?: 'auto' | 'start' | 'middle' | 'end'
}

export interface TruncateState {
  isTruncated: boolean
}
