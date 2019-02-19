export type Placements =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start'

export interface PopProps {
  animationDelay: number | string
  animationDuration: number | string
  animationEasing: string
  animationSequence: string | Array<string>
  arrowClassName: string
  children?: any
  className?: string
  closeOnBodyClick: boolean
  closeOnEscPress: boolean
  closeOnContentClick: boolean
  closeOnMouseLeave: boolean
  display: string
  id?: string
  isOpen: boolean
  modifiers: any
  onClose: (Pop: any) => void
  onOpen: (Pop: any) => void
  placement: Placements
  triggerOn: 'click' | 'hover'
  showArrow: boolean
  zIndex?: number
}

export type PopperStyles = {
  arrowSize: string
  offset: string
  placement: Placements
  style: Object
}
